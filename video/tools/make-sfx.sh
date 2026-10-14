#!/usr/bin/env bash
# Synthesises the film's sound effects and music bed with ffmpeg (no third-party audio).
# All files: 48 kHz stereo, 16-bit, peaks at -3 dBFS, short fades so nothing clicks.
# Replace any file in public/audio with licensed audio of the same name to swap it.
set -euo pipefail
cd "$(dirname "$0")/.."
SFX=public/audio/sfx; MUS=public/audio/music
mkdir -p "$SFX" "$MUS"
A="-ar 48000 -ac 2 -c:a pcm_s16le"
norm() { # $1 in $2 out
  local peak; peak=$(ffmpeg -hide_banner -i "$1" -af volumedetect -f null - 2>&1 | sed -n 's/.*max_volume: \(-\?[0-9.]*\) dB/\1/p')
  local gain; gain=$(python3 -c "print(-3 - float('$peak'))")
  ffmpeg -v error -y -i "$1" -af "volume=${gain}dB" $A "$2"; rm -f "$1"
}
gen() { # name duration filtergraph
  ffmpeg -v error -y -f lavfi -i "$3" -t "$2" $A "/tmp/sfx_$1.wav"; norm "/tmp/sfx_$1.wav" "$SFX/$1.wav"
}

# Whoosh: band-passed noise sweeping up then down.
gen whoosh 0.7 "anoisesrc=d=0.7:c=pink:a=0.8,highpass=f=300,lowpass=f=6000,bandpass=f=1800:width_type=o:w=2,volume='sin(PI*t/0.7)^2':eval=frame,afade=t=in:d=0.05,afade=t=out:st=0.55:d=0.15"
# Impact: low sine drop + soft noise transient.
gen impact 1.2 "aevalsrc='0.9*sin(2*PI*(55+60*exp(-t*9))*t)*exp(-t*3.2)+0.25*(random(0)*2-1)*exp(-t*28)':s=48000,lowpass=f=2500,afade=t=out:st=0.9:d=0.3"
# Tick: short bright click.
gen tick 0.12 "aevalsrc='0.8*sin(2*PI*2100*t)*exp(-t*55)+0.3*sin(2*PI*4200*t)*exp(-t*80)':s=48000,afade=t=out:st=0.08:d=0.04"
# Glitch: stuttered filtered noise.
gen glitch 0.45 "aevalsrc='(random(0)*2-1)*(gt(sin(2*PI*28*t),0))*exp(-t*5)':s=48000,bandpass=f=1200:width_type=o:w=1.5,afade=t=out:st=0.35:d=0.1"
# Count: rapid soft ticks for number counters.
gen count 1.0 "aevalsrc='0.6*sin(2*PI*1600*t)*exp(-mod(t,0.06)*90)*(1-t)':s=48000,afade=t=in:d=0.01,afade=t=out:st=0.85:d=0.15"
# Riser: noise + rising tone into the CTA.
gen riser 1.9 "aevalsrc='0.35*sin(2*PI*(200+500*t*t/3.6)*t)*t/1.9+0.25*(random(0)*2-1)*(t/1.9)^2':s=48000,highpass=f=150,lowpass=f=7000,afade=t=in:d=0.3,afade=t=out:st=1.75:d=0.15"
# Shimmer: soft bell chord.
gen shimmer 1.4 "aevalsrc='(0.5*sin(2*PI*1046.5*t)+0.4*sin(2*PI*1318.5*t)+0.35*sin(2*PI*1568*t))*exp(-t*3)':s=48000,aecho=0.6:0.5:60|110:0.3|0.2,afade=t=out:st=1.2:d=0.2"

# Music bed: 60 s ambient pad in D (Dmaj9 → Bm7 → Gmaj7 → A), slow swell, low-passed, no drums.
python3 - <<'PY'
import math, wave, struct, random
sr=48000; dur=60.0; n=int(sr*dur)
chords=[[146.83,185.0,220.0,277.18,329.63],[123.47,146.83,185.0,220.0,293.66],[98.0,146.83,196.0,246.94,293.66],[110.0,138.59,164.81,220.0,277.18]]
bar=7.5
random.seed(7)
L=[0.0]*n; R=[0.0]*n
for i in range(n):
    t=i/sr; ci=int(t//bar)%4; nx=(ci+1)%4; pos=(t%bar)/bar
    x=min(1.0,max(0.0,(pos-0.8)/0.2))  # crossfade into next chord over last 20% of the bar
    sl=sr_=0.0
    for k,(f0,f1) in enumerate(zip(chords[ci],chords[nx])):
        amp=0.16/(1+k*0.35)
        trem=0.85+0.15*math.sin(2*math.pi*(0.11+k*0.03)*t+k)
        v0=math.sin(2*math.pi*f0*t)+0.25*math.sin(2*math.pi*2*f0*t+0.3)
        v1=math.sin(2*math.pi*f1*t)+0.25*math.sin(2*math.pi*2*f1*t+0.3)
        v=amp*trem*((1-x)*v0+x*v1)
        pan=0.5+0.35*math.sin(k*1.7+t*0.05)
        sl+=v*(1-pan); sr_+=v*pan
    L[i]=sl; R[i]=sr_
peak=max(max(abs(a) for a in L),max(abs(b) for b in R))
g=0.5/peak
with wave.open('/tmp/bed_raw.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes(b''.join(struct.pack('<hh',int(L[i]*g*32767),int(R[i]*g*32767)) for i in range(n)))
PY
ffmpeg -v error -y -i /tmp/bed_raw.wav -af "lowpass=f=2200,aecho=0.7:0.6:180|320:0.25|0.18,afade=t=in:d=2.5,afade=t=out:st=56:d=4" $A /tmp/bed_fx.wav
norm /tmp/bed_fx.wav "$MUS/bed.wav"; rm -f /tmp/bed_raw.wav
echo "SFX + music bed written."
