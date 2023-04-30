import UiButton from "../components/ui/buttons/UiButton";

export default {
  title: "Components/UiButton",
  component: UiButton,
};



const Template: <typeof UiButton> = (args) => <UiButton {...args} />;
export const Default = Template.bind({});

Default.args = {
  children: "Button",
  variant: "white",
};
