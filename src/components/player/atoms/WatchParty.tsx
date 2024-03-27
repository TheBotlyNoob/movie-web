import { useEffect, useState } from "react";

import { Icons } from "@/components/Icon";
import { OverlayAnchor } from "@/components/overlays/OverlayAnchor";
import { Overlay } from "@/components/overlays/OverlayDisplay";
import { OverlayPage } from "@/components/overlays/OverlayPage";
import { OverlayRouter } from "@/components/overlays/OverlayRouter";
import { VideoPlayerButton } from "@/components/player/internals/Button";
import { Menu } from "@/components/player/internals/ContextMenu";
import { useOverlayRouter } from "@/hooks/useOverlayRouter";
import { usePlayerStore } from "@/stores/player/store";

export interface RTCSessDesc {
  type: "offer" | "answer" | "pranswer" | null;
  sdp: string | null;
}

export function WatchPartyOverlay({ id }: { id: string }) {
  const [offer, setOffer] = useState<RTCSessionDescription | null>(null);
  const [answer, setAnswer] = useState<RTCSessionDescription | null>(null);

  return (
    <Overlay id={id}>
      <OverlayRouter id={id}>
        <OverlayPage id={id} path="/" width={343} height={431}>
          <Menu.Card>
            <h1>heya</h1>
          </Menu.Card>
        </OverlayPage>
      </OverlayRouter>
    </Overlay>
  );
}

export function WatchPartyRouter() {
  return <WatchPartyOverlay id="watchparty" />;
}

export function WatchParty() {
  const router = useOverlayRouter("watchparty");
  const setHasOpenOverlay = usePlayerStore((s) => s.setHasOpenOverlay);

  useEffect(() => {
    setHasOpenOverlay(router.isRouterActive);
  }, [setHasOpenOverlay, router.isRouterActive]);

  return (
    <OverlayAnchor id={router.id}>
      <VideoPlayerButton
        onClick={() => router.open()}
        icon={Icons.WATCH_PARTY}
      />
    </OverlayAnchor>
  );
}
