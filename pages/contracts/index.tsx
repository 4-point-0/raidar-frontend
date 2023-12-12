import { Anchor, Center, Container, Table, Text, Title } from "@mantine/core";
import {
  fetchContractControllerFindAllUserContracts,
  fetchContractControllerFindAllSignedArtistContracts,
  fetchUserControllerFindMe,
  fetchContractControllerFindAllBaseArtistContracts,
} from "@/services/api/raidar/raidarComponents";
import { useEffect, useState } from "react";
import classes from "./TableScrollArea.module.css";
import { ContractDto } from "@/services/api/raidar/raidarSchemas";

export const Contracts = () => {
  const [isArtist, setIsArtist] = useState<boolean | null>(null);
  const [
    baseArtistContractsForCreatedSongs,
    setBaseArtistContractsForCreatedSongs,
  ] = useState<any>(null);
  const [soldArtistSongsContractListData, setSoldArtistSongsContractListData] =
    useState<any>(null);
  const [bougtUserSongsContractListData, setBoughtUserSongscontractListData] =
    useState<any>(null);

  const getUserData = async () => {
    const user = await fetchUserControllerFindMe({});
    setIsArtist(user.roles.includes("artist") ? true : false);
  };

  const getArtistBaseContractsData = async () => {
    const contractList =
      (await fetchContractControllerFindAllBaseArtistContracts({})) as any;
    setBaseArtistContractsForCreatedSongs(contractList.data.results);
  };

  const getArtistSoldSongsContractData = async () => {
    const contractList =
      (await fetchContractControllerFindAllSignedArtistContracts({})) as any;
    setSoldArtistSongsContractListData(contractList.data.results);
  };

  const getUserBoughtSongsContractData = async () => {
    const contratList = (await fetchContractControllerFindAllUserContracts(
      {}
    )) as any;
    setBoughtUserSongscontractListData(contratList.data.results);
  };

  useEffect(() => {
    getUserData();
    if (isArtist) {
      getArtistBaseContractsData();
      getArtistSoldSongsContractData();
    } else {
      getUserBoughtSongsContractData();
    }
  }, [isArtist]);

  const baseArtistContractSongsRow = baseArtistContractsForCreatedSongs
    ? baseArtistContractsForCreatedSongs.map((element: ContractDto) => (
        <tr key={element.id}>
          <td>{new Date(element.created_at).toLocaleDateString("en-us")}</td>
          <td>{element.songName}</td>
          <td>{element.artistName}</td>
          <td>
            <Anchor color="red" href={element.pdfUrl}>
              See contract
            </Anchor>
          </td>
        </tr>
      ))
    : null;

  const soldArtistContactSongsRow = soldArtistSongsContractListData
    ? soldArtistSongsContractListData.map((element: ContractDto) => (
        <tr key={element.id}>
          <td>{new Date(element.created_at).toLocaleDateString("en-us")}</td>
          <td>{element.songName}</td>
          <td>{element.artistName}</td>
          <td>{element.customerName}</td>
          <td>
            <Anchor color="red" href={element.pdfUrl}>
              See contract
            </Anchor>
          </td>
        </tr>
      ))
    : null;

  const boughtUserContactSongsRow = bougtUserSongsContractListData
    ? bougtUserSongsContractListData.map((element: ContractDto) => (
        <tr key={element.id}>
          <td>{new Date(element.created_at).toLocaleDateString("en-us")}</td>
          <td>{element.songName}</td>
          <td>{element.artistName}</td>
          <td>
            <Anchor color="red" href={element.pdfUrl}>
              See contract
            </Anchor>
          </td>
        </tr>
      ))
    : null;

  return (
    <Container size="lg" py="sm">
      <Center>
        <Title className={classes.title}>Your Contracts</Title>
      </Center>
      <Center>
        <Text c="dimmed" className={classes.description} ta="center">
          Access and manage PDF contracts for songs you've created, sold, or
          purchased on our platform.
        </Text>
      </Center>
      {isArtist ? (
        <>
          <Text fw={600} mt="xl">
            Created Songs
          </Text>
          <Table mt="md">
            <thead>
              <tr>
                <th>Created At</th>
                <th>Song Name</th>
                <th>Artist Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{baseArtistContractSongsRow}</tbody>
          </Table>
          <Text mt="xl" fw="600">
            Sold Songs
          </Text>
          <Table mt="md">
            <thead>
              <tr>
                <th>Created At</th>
                <th>Song Name</th>
                <th>Artist Name</th>
                <th>Buyer Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{soldArtistContactSongsRow}</tbody>
          </Table>
        </>
      ) : (
        <>
          <Text mt="xl" fw="600">
            Bought Songs
          </Text>
          <Table mt="md">
            <thead>
              <tr>
                <th>Created At</th>
                <th>Song Name</th>
                <th>Artist Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{boughtUserContactSongsRow}</tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default Contracts;
