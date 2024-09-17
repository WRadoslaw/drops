import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./misc/routes";
import { MainContent } from "./views/MainContent";
import { SceneProvider } from "./providers/scene/scene.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlanetOverlay } from "./views/PlanetOverlay";

const client = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <SceneProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.root()} element={<MainContent />}>
              <Route path={routes.planetInfo()} element={<PlanetOverlay />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SceneProvider>
    </QueryClientProvider>
  );
};
