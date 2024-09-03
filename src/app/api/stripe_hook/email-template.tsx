import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  qrCodeUrl: string;
  ticketType: "fan" | "vip" | "premium";
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  qrCodeUrl,
  ticketType,
}) => {
  const getTelegramLink = (type: "fan" | "vip" | "premium") => {
    switch (type) {
      case "fan":
        return "https://t.me/Nail_Moment_bot?start=8yXgag6xFnDEsFaf";
      case "vip":
        return "https://t.me/Nail_Moment_bot?start=6OboeAITvgiwULVj";
      case "premium":
        return "https://t.me/Nail_Moment_bot?start=uJn7C6mN1VTp0lYA";
      default:
        return "https://t.me/Nail_Moment_bot?start=8yXgag6xFnDEsFaf";
    }
  };

  return (
    <Html>
      <Head />
      <Preview>Запрошення на конференцію Nail Moment</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Вітаємо, {name}!</Heading>
          <Text style={text}>
            Ми раді запросити вас на конференцію Nail Moment. Ваш квиток
            готовий!
          </Text>
          <Section style={qrContainer}>
            <Img
              src={qrCodeUrl}
              width="200"
              height="200"
              alt="QR код вашого квитка"
              style={qrCode}
            />
          </Section>
          <Text style={text}>
            Будь ласка, збережіть цей QR код. Він буде потрібен для входу на
            конференцію.
          </Text>
          <Text style={text}>
            Дата: 13 Жовтня
            <br />
            Місце: Баскетбольна арена Jozefa Szanajcy 17/19, 03-481 Warszawa
            <br />
            <Link href={getTelegramLink(ticketType)} style={link}>
              Телеграм канал
            </Link>
          </Text>
          <Text style={text}>З нетерпінням чекаємо на зустріч з вами!</Text>
          <Text style={footer}>
            З повагою,
            <br />
            Команда Nail Moment
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "system-ui, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "17px 0 0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const qrContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const qrCode = {
  margin: "0 auto",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  marginTop: "30px",
};

const link = {
  color: "#2754C5",
  textDecoration: "underline",
};
