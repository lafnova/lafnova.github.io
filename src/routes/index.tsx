import { createFileRoute } from "@tanstack/react-router";
import { LafNovaLanding } from "@/components/lafnova/LafNovaLanding";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <LafNovaLanding />;
}
