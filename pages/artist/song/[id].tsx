import SongDetails from "@/components/SongDetails";

const song = {
  id: "547c3d2d-3423-4bdc-8927-0a12290be114",
  user_id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
  title: "Sunset Melodies",
  length: 212,
  genre: "Indie Rock",
  mood: ["Energetic"],
  tags: ["Summer"],
  bpm: 130,
  instrumental: true,
  languages: ["English"],
  vocal_ranges: ["Tenor"],
  musical_key: "G Major",
  recording_date: "2023-07-17T10:39:43.582Z",
  recording_location: "London",
  recording_country: "United Kingdom",
  pka: "Dompadre",
  last_listing: {
    id: "1a127dfd-7218-4e0e-8fe2-8730339b5102",
    seller: {
      id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
      email: "dominik.bosnjak94@gmail.com",
      first_name: "Dominik",
      last_name: "Bošnjak",
      roles: ["artist"],
      provider: "google",
      provider_id: "112385724412693421820",
      wallet_address: null,
      created_at: "2023-07-07T08:06:16.669Z",
      updated_at: "2023-07-07T08:06:16.669Z",
    },
    buyer: null,
    tx_hash: null,
    price: "14.99",
    created_at: "2023-07-17T12:40:46.020Z",
    updated_at: "2023-07-17T12:40:46.020Z",
    created_by_id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
    updated_by_id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
  },
  music: {
    id: "0c39843c-5bcf-4af9-a4ff-536d90824e98",
    name: "music-1 (1).wav",
    url: "https://raidar-files.s3.eu-central-1.amazonaws.com/cd1cde07-e7a1-48fd-8ffd-624deae680c9",
    key: "cd1cde07-e7a1-48fd-8ffd-624deae680c9",
    mime_type: "audio/wav",
    url_expiry: "2024-07-17T12:37:17.794Z",
    created_at: "2023-07-17T12:37:17.795Z",
    updated_at: "2023-07-17T12:37:17.795Z",
    created_by_id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
    updated_by_id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
  },
  art: {
    id: "2ab746b0-7a22-4cc3-b74e-e003c1e89a45",
    name: "11.jpg",
    url: "https://raidar-files.s3.eu-central-1.amazonaws.com/9b2abe40-e35c-4ca3-bfd1-10bfde612725",
    key: "9b2abe40-e35c-4ca3-bfd1-10bfde612725",
    mime_type: "image/jpeg",
    url_expiry: null,
    created_at: "2023-07-17T12:37:06.241Z",
    updated_at: "2023-07-17T12:37:06.241Z",
    created_by_id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
    updated_by_id: "f65abadb-dbb4-421e-b648-6d9ea3387f76",
  },
  album: null,
};

export const Song = () => {
  return <SongDetails song={song} />;
};

export default Song;
