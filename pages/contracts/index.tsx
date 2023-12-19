import {
  Button,
  Center,
  Container,
  Pagination,
  Table,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  fetchContractControllerFindAllUserContracts,
  fetchContractControllerFindAllSignedArtistContracts,
  fetchUserControllerFindMe,
  fetchContractControllerFindAllBaseArtistContracts,
} from "@/services/api/raidar/raidarComponents";
import { useEffect, useState } from "react";
import classes from "./TableScrollArea.module.css";
import { ContractDto } from "@/services/api/raidar/raidarSchemas";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

export const Contracts = () => {
  const theme = useMantineTheme();

  const bigScreen = useMediaQuery("(min-width: 56.25em)");

  const [isArtist, setIsArtist] = useState<boolean | null>(null);
  const [
    baseArtistContractsForCreatedSongs,
    setBaseArtistContractsForCreatedSongs,
  ] = useState<any>(null);
  const [soldArtistSongsContractListData, setSoldArtistSongsContractListData] =
    useState<any>(null);
  const [bougtUserSongsContractListData, setBoughtUserSongscontractListData] =
    useState<any>(null);

  /*********************** Pagination **********************/
  const [currentPageCreated, setCurrentPageCreated] = useState(1);
  const [totalPagesCreated, setTotalPagesCreated] = useState(0);

  const [currentPageSold, setCurrentPageSold] = useState(1);
  const [totalPagesSold, setTotalPagesSold] = useState(0);

  const [currentPageBought, setCurrentPageBought] = useState(1);
  const [totalPagesBought, setTotalPagesBought] = useState(0);

  const limit = 10;
  /********************************************************/

  const getUserData = async () => {
    const user = await fetchUserControllerFindMe({});
    setIsArtist(user.roles.includes("artist") ? true : false);
  };

  const getArtistBaseContractsData = async (page: any) => {
    const contractList: any =
      await fetchContractControllerFindAllBaseArtistContracts({
        queryParams: { limit, page },
      });
    setBaseArtistContractsForCreatedSongs(contractList.data.results);
    setTotalPagesCreated(Math.ceil(contractList.data.total / limit));
  };

  const getArtistSoldSongsContractData = async () => {
    const contractList =
      (await fetchContractControllerFindAllSignedArtistContracts({})) as any;
    setSoldArtistSongsContractListData(contractList.data.results);
  };

  const getUserBoughtSongsContractData = async () => {
    const contractList = (await fetchContractControllerFindAllUserContracts(
      {}
    )) as any;
    setBoughtUserSongscontractListData(contractList.data.results);
  };

  useEffect(() => {
    getUserData();
    if (isArtist) {
      getArtistBaseContractsData(currentPageCreated);
      getArtistSoldSongsContractData();
    } else {
      getUserBoughtSongsContractData();
    }
  }, [isArtist, currentPageCreated]);

  const baseArtistContractSongsRow = baseArtistContractsForCreatedSongs
    ? baseArtistContractsForCreatedSongs.map((element: ContractDto) => (
        <tr key={element.id}>
          <td>{new Date(element.created_at).toLocaleDateString("en-us")}</td>
          <td>{element.songName}</td>
          <td>{element.artistName}</td>
          <td>
            <Button
              href={element.pdfUrl}
              fw={700}
              size="sm"
              component={Link}
              style={{
                backgroundColor: "transparent",
                color: theme.colors.red[6],
                textAlign: "center",
              }}
            >
              {bigScreen ? `See Contract` : `Contract`}
            </Button>
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
            <Button
              href={element.pdfUrl}
              fw={700}
              size="sm"
              component={Link}
              style={{
                backgroundColor: "transparent",
                color: theme.colors.red[6],
                textAlign: "center",
              }}
            >
              {bigScreen ? `See Contract` : `Contract`}
            </Button>
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
            <Button
              href={element.pdfUrl}
              fw={700}
              size="sm"
              component={Link}
              style={{
                backgroundColor: "transparent",
                color: theme.colors.red[6],
                textAlign: "center",
              }}
            >
              {bigScreen ? `See Contract` : `Contract`}
            </Button>
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
          Access PDF contracts for songs you've created, sold, or purchased on
          our platform.
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
                <th>Created</th>
                <th>Song Name</th>
                <th>Artist Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{baseArtistContractSongsRow}</tbody>
          </Table>
          {/* <Center mt="md">
            <Pagination
              total={totalPagesCreated}
              value={currentPageCreated}
              onChange={setCurrentPageCreated}
              color="red"
              radius="md"
            />
          </Center> */}

          <Text mt="xl" fw="600">
            Sold Songs
          </Text>
          <Table mt="md">
            <thead>
              <tr>
                <th>Created</th>
                <th>Song Name</th>
                <th>Artist Name</th>
                <th>Buyer Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{soldArtistContactSongsRow}</tbody>
          </Table>
          {/* <Center mt="md">
            <Pagination total={10} color="red" radius="md" />
          </Center> */}
        </>
      ) : (
        <>
          <Text mt="xl" fw="600">
            Bought Songs
          </Text>
          <Table mt="md">
            <thead>
              <tr>
                <th>Created</th>
                <th>Song Name</th>
                <th>Artist Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{boughtUserContactSongsRow}</tbody>
            {/* <Center mt="md">
              <Pagination total={10} color="red" radius="md" />
            </Center> */}
          </Table>
        </>
      )}
    </Container>
  );
};

export default Contracts;
