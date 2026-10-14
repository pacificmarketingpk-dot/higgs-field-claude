import React, { createContext, useContext } from "react";
import { Timeline } from "./timeline";

export interface FilmFlags {
  hasNarration: boolean;
  hasPresenter: boolean;
  hasMusic: boolean;
  showPlaceholders: boolean;
}

const Ctx = createContext<{ tl: Timeline; flags: FilmFlags } | null>(null);

export const FilmProvider: React.FC<{ tl: Timeline; flags: FilmFlags; children: React.ReactNode }> = ({
  tl,
  flags,
  children,
}) => <Ctx.Provider value={{ tl, flags }}>{children}</Ctx.Provider>;

export const useFilm = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFilm outside FilmProvider");
  return v;
};
