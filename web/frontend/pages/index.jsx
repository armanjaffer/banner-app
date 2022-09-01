import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage, kindredBlue } from "../assets";


export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="App name" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <div width={'50%'} margin={'auto'}>
                  <Image
                        source={kindredBlue}
                        alt="Kindred logo"
                  />
                </div>
                <br/>                <br/>
                <TextContainer spacing="loose">
                  <Heading>Thank you for installing Kindred 🎉</Heading>
                  <p>
                    We're excited to find new values-aligned customers to shop at your store! If you have any problems or questions feel free to
                    reach us at &nbsp;
                    <Link url="mailto:usekindred@gmail.com">
                      usekindred@gmail.com
                    </Link>
                  </p>
                  <p>
                    <Link url="www.usekindred.com/faq" external>
                      FAQ
                    </Link>
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
