import AlbumSongs from "@/components/artist/Album/AlbumSongs";

const songList = [
  {
    title: "Silhouette of Yesterday",
    description:
      "A melodious journey back in time, bringing back nostalgic memories and past echoes.",
    src: "https://i.pinimg.com/564x/48/e0/86/48e0865834fdbc664eef04e5a28be482.jpg",
    price: "20",
  },
  {
    title: "Moonlight Whispers",
    description:
      "A tranquil and peaceful symphony that speaks the language of the night, the moon and the stars.",
    src: "https://i.pinimg.com/564x/6b/e8/97/6be8979e3e3372e4241312562f030872.jpg",
  },
  {
    title: "Crimson Echoes",
    description:
      "An intense and fiery musical experience that resonates with strong emotions and passions.",
    src: "https://i.pinimg.com/564x/b9/66/0a/b9660aa5361ae51362805f694bf9cf08.jpg",
  },
  {
    title: "Sapphire Skies",
    description:
      "A soothing tune that mirrors the serenity and vastness of clear blue skies.",
    src: "https://i.pinimg.com/564x/29/f2/da/29f2dace59c995b6e0425e1c26f2615e.jpg",
  },
  {
    title: "Shadows on the Canvas",
    description:
      "A creative fusion of sounds, offering a mysterious and intriguing auditory experience.",
    src: "https://i.pinimg.com/564x/c9/64/b4/c964b4e8dd63bfd402ae4d8a6cbbd5e5.jpg",
  },
  {
    title: "Midnight Carousel",
    description:
      "A whimsical and enchanting musical ride that transports you to magical realms.",
    src: "https://i.pinimg.com/564x/40/ec/e3/40ece3e45e133882837b2b70c4933633.jpg",
  },
  {
    title: "Daydream Symphony",
    description:
      "A harmonious ensemble that evokes feelings of light-hearted daydreams and positivity.",
    src: "https://i.pinimg.com/564x/03/26/ee/0326ee54be41beccf4920b6f5fcc6757.jpg",
  },
  {
    title: "Phoenix's Flight",
    description:
      "An inspiring and uplifting melody, embodying the resilience and majesty of the mythical bird.",
    src: "https://i.pinimg.com/564x/76/d5/dd/76d5dd99b0463a49503f6dbd2defe98d.jpg",
  },
  {
    title: "Neon Heartbeat",
    description:
      "A vibrant track that pulses with the rhythm of the city and the beat of the heart.",
    src: "https://i.pinimg.com/564x/b1/1a/ac/b11aac5aacf4ac6dd1fa7c0158f3b1b1.jpg",
  },
];

export const Album = () => {
  return <AlbumSongs />;
};

export default Album;
