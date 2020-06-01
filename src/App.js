import React from "react";
import "./App.sass";
import EventPage from "./pages/EventPage";
import MeetingLoading from "./containers/MeetingLoading";
import ErrorBoundary from "./components/ErrorBoundry";

function App() {
  return (
    <ErrorBoundary>
      <React.Suspense
        fallback={<MeetingLoading text="MeetingHang Yükleniyor..." />}
      >
        <EventPage />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
