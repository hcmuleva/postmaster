import { Routes, Route } from "react-router-dom";
import { ErrorComponent } from "@refinedev/antd";
export default function CustomRouter() {
  return (
    <Routes>
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
}
