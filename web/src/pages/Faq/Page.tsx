import Card from "../../components/Card";
import Title from "../../components/Title";
import Template from "../../components/Template";
import Accordion from "../../components/Accordion";
import Breadcrumb from "../../components/Breadcrumb";

export default () => {
  const faq = [
    {
      title: "What is a SAAS platform?",
      description:
        "SAAS platform is a cloud-based software service that allows users to access and use a variety of tools and functionality.",
    },
    {
      title: "How does billing work?",
      description:
        "We offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
    },
    {
      title: "How do I access documentation?",
      description:
        "Documentation is available on the company's website and can be accessed by logging in to your account. The documentation provides detailed information on how to use the , as well as code examples and other resources.",
    },
  ];

  return (
    <Template>
      <Breadcrumb
        links={[
          {
            label: "Home",
            href: "/home",
          },
          {
            label: "Frequently Asked Questions",
            href: "",
          },
        ]}
      />

      <Title>Frequently Asked Questions</Title>

      <Card>
        <div className="grid divide-y divide-neutral-200">
          {faq.map((item: any, index: any) => (
            <Accordion key={index} title={item.title}>
              {item.description}
            </Accordion>
          ))}
        </div>
      </Card>
    </Template>
  );
};
