"use client";

import dynamic from "next/dynamic";

// R3F/three touch the DOM (canvas, WebGL) so it must never render on the
// server. This wrapper keeps that concern out of the section components.
const MorphScene = dynamic(() => import("./MorphScene"), {
  ssr: false,
});

export default MorphScene;
