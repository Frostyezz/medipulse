import { useCallback, useMemo, useState } from "react";
import { PasswordInput, Progress, Text, Popover, Box } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Check, X } from "tabler-icons-react";
import { UseFormReturnType } from "@mantine/form";
import { CreateAccountFormValues } from "@/views/Register/CreateAccount/hooks/useCreateAccountForm";

const PasswordRequirement: React.FC<{
  meets: boolean;
  label: string;
}> = ({ meets, label }) => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <Check size={14} /> : <X size={14} />} <Box ml={10}>{label}</Box>
    </Text>
  );
};

const RegisterPasswordInput: React.FC<{
  form: UseFormReturnType<CreateAccountFormValues>;
}> = ({ form }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { t } = useTranslation();

  const requirements = useMemo(
    () => [
      { re: /[0-9]/, label: t("register.password.requirement.number") },
      { re: /[a-z]/, label: t("register.password.requirement.lowercase") },
      { re: /[A-Z]/, label: t("register.password.requirement.uppercase") },
      {
        re: /[$&+,:;=?@#|'<>.^*()%!-]/,
        label: t("register.password.requirement.symbol"),
      },
    ],
    [t]
  );

  const getStrength = useCallback(
    (password: string) => {
      let multiplier = password.length > 5 ? 0 : 1;

      requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
          multiplier += 1;
        }
      });

      return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    },
    [requirements]
  );

  const checks = useMemo(
    () =>
      requirements.map((requirement, index) => (
        <PasswordRequirement
          key={index}
          label={requirement.label}
          meets={requirement.re.test(form.values.password)}
        />
      )),
    [form.values.password, requirements]
  );

  const strength = useMemo(
    () => getStrength(form.values.password),
    [form.values.password, getStrength]
  );
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <div>
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transition="pop"
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              withAsterisk
              {...form.getInputProps("password")}
              label={t("register.label.password")}
              placeholder={t("register.label.password") as string}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress
            color={color}
            value={strength}
            size={5}
            style={{ marginBottom: 10 }}
          />
          <PasswordRequirement
            label={t("register.password.requirement.chars")}
            meets={form.values.password.length > 5}
          />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default RegisterPasswordInput;
