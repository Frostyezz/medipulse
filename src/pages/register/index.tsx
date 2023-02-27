import RegisterLayout from "@/common/components/RegisterLayout";
import RegisterStepper from "@/common/components/RegisterStepper";
import RegisterController from "@/views/Register";

export default function index() {
  return (
    <RegisterLayout>
      <RegisterStepper />
      <RegisterController />
    </RegisterLayout>
  );
}
