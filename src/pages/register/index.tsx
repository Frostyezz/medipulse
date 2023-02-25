import RegisterLayout from "@/common/components/RegisterLayout";
import RegisterController from "@/views/Register";

export default function index() {
  return (
    <RegisterLayout>
      <RegisterController />
    </RegisterLayout>
  );
}
