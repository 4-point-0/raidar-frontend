import {
  Text,
  useMantineTheme,
  Container,
  Center,
  Title,
  Accordion,
  Button,
} from "@mantine/core";
import classes from "./documentation.module.css";
import Link from "next/link";

const documents = [
  {
    title: "Confused about whether or not  you control your composition?",
    description:
      "The document serves as a guide for determining the ownership and licensing rights of a musical composition. It leads the reader through various scenarios involving co-writing, session musicians, sample usage, and involvement of producers or engineers. The outcome of each path in the flowchart indicates whether the individual can license their composition, with specific conditions for different situations.",
    href: "/documentation/edu-controlled-comp-flowchart.pdf",
  },
  {
    title: "RAIDAR Synchronization License Template",
    description:
      "The RAIDAR Synchronization License Template is a legal agreement template designed for use between Berklee and Lesley students, facilitating the licensing of musical works for media and film projects. It outlines non-exclusive rights granted by the licensor (Berklee student) to the licensee (Lesley student), along with provisions for indemnification, breach of agreement, and limitations of liability. The document includes terms for the use, representation, and warranties of the licensed work, and is governed by the laws of Massachusetts.",
    href: "/documentation/RDR-Sync-License-Template.pdf",
  },
  {
    title: "Synchronization License Example",
    description:
      "The Synchronization License Example is a legal agreement between a Berklee student (licensor) and a Lesley student (licensee) for the non-exclusive use of a musical work in a film or media project. The document outlines terms for rights granted, representations and warranties, and procedures for addressing breaches, including indemnification clauses for both parties. It includes an Exhibit A detailing a specific work titled Save the Day, used in a fictional deodorant advertisement, with terms for use, a license fee of $100, and credit requirements for the licensor.",
    href: "/documentation/sync-license-example.pdf",
  },
  {
    title: "Synchronization License Explainer",
    description:
      "This document provides an educational overview of the key elements and legal terminologies relevant to synchronization licenses, with a focus on general contract knowledge such as intent, consideration, capacity, and specific contract terms used in synchronization agreements. It explains the legal requirements for a valid contract and details specific terms like Licensor, Licensee, Program, and Composition, which are commonly used in synchronization license agreements. The document also covers concepts like copyright, indemnification, jurisdiction, and remedies, aimed at clarifying the understanding of synchronization licenses in a film or media context.",
    href: "/documentation/sync-license-explainer.pdf",
  },
  {
    title: "Synchronization License Template",
    description:
      "This document, revised on January 24, 2023, by the RAIDAR team, serves as a template for a synchronization license agreement between a Berklee student (licensor) and a Lesley student (licensee). It outlines the non-exclusive rights granted for the use of musical works in media and film, with detailed terms including the preservation of the licensor's right to license the music to others. The template includes provisions on representations, warranties, indemnification, and remedies, along with guidelines for notices, legal validity, and governing law, emphasizing the independent contractor status of both parties.",
    href: "/documentation/sync-license-template.pdf",
  },
  {
    title: "Explainer of Music Industry Terms",
    description:
      "This document provides a comprehensive glossary of terms commonly used in the music industry, particularly focusing on publishing, rights, and licensing aspects. It explains key concepts such as administration deals, compulsory mechanical licenses, Copyrights, and different types of royalties, including mechanical, artist, and synchronization royalties. The explainer also delves into the specifics of performance rights organizations, such as ASCAP and BMI, and covers legal concepts like public domain, recoupment, and works for hire, providing a valuable resource for understanding the business side of the music industry.",
    href: "/documentation/terms-explainer.pdf",
  },
  {
    title: "Work for Hire Explainer",
    description:
      "This document, updated on October 5, 2020, offers an in-depth explanation of the Work for Hire concept, including the essential elements that constitute a valid contract such as intent, consideration, and capacity. It outlines the roles and responsibilities of both the employer and the musician in a work-for-hire agreement, detailing the ramifications for each party, including copyright ownership, financial responsibilities, and the status of the musician as an independent contractor. The document also covers legal clauses related to confidentiality, indemnification, moral rights, and the severability of contract terms, providing a comprehensive guide for understanding work-for-hire agreements in the music industry. ",
    href: "/documentation/wfh-explainer.pdf",
  },
  {
    title: "Work For Hire Template",
    description:
      "This template, revised by the RAIDAR team on January 23, 2023, provides a comprehensive framework for a work-for-hire agreement between an employer and a musician. It specifies the terms of engagement, assigning all copyright and ownership of the created work to the employer, while outlining the musician's responsibilities, including the waiver of moral rights and ensuring all necessary rights and permissions are secured for the work. The document also addresses considerations for both monetary and non-monetary compensation, indemnification clauses, independent contractor status, and confidentiality requirements, making it a detailed guide for legal agreements in the music industry. ",
    href: "/documentation/wfh-template.pdf",
  },
];

export const Documentation = () => {
  const theme = useMantineTheme();

  const items = documents.map((document, index) => (
    <Accordion.Item key={index} className={classes.item} value={`${index}`}>
      <Accordion.Control>{document.title}</Accordion.Control>

      <Accordion.Panel>
        {document.description}
        <br />
        <Button
          href={`${document.href}`}
          fw={700}
          size="md"
          component={Link}
          mt="xl"
          style={{
            backgroundColor: "transparent",
            color: theme.colors.red[6],
            textAlign: "left",
          }}
        >
          Open Document
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        List of Documents
      </Title>

      <Center>
        <Text c="dimmed" className={classes.description} ta="center">
          Discover a comprehensive collection of legal templates and explainers,
          tailored for the music industry, on our dedicated page.
        </Text>
      </Center>

      <Accordion variant="separated" mt={"10%"}>
        {items}
      </Accordion>
    </Container>
  );
};

export default Documentation;
