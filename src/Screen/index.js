import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { BsPlayCircle } from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { FaIdBadge } from "react-icons/fa";
// import ReactAudioPlayer from "react-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { lastPlayed } from "../Redux/Actions/actions";
import Audios from "../Data/Audios.json";

export default function Audio() {
  const toast = useToast();
  const lastPlayedState = useSelector((state) => state.lastPlayedReducer);
  const dispatch = useDispatch();

  //   console.log("state", lastPlayedState);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioSource, setAudioSource] = useState("");
  const [title, setTitle] = useState("Ready to play");
  const [onBoard, setOnBoard] = useState(true);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const PauseAndPlay = () => {
    if (onBoard) {
      notify();
      return;
    }

    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;

    dispatch(lastPlayed("updateCurrentTime", audioPlayer.current.currentTime));

    if (audioPlayer.current.ended) {
      setIsPlaying(false);
      dispatch(lastPlayed("updateCurrentTime", 0));
      progressBar.current.value = 0;
      return;
    }
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  //handles minutes and seconds for duration sake
  const timeCalculator = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  // moves the range progress bar according to audio current time

  const handleAudioPosition = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
  };

  // changes the current audio in play
  const changeAudio = (src, title) => {
    setAudioSource(src);
    setTitle(title);
    setOnBoard(false);

    if (title === lastPlayedState.audioTitle) {
      setTimeout(() => {
        audioPlayer.current.currentTime = lastPlayedState.audioCurrentTime;
        progressBar.current.value = lastPlayedState.audioCurrentTime;
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        setIsPlaying(true);

        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }, 500);
    }

    setTimeout(() => {
      dispatch(lastPlayed("updateTitle", title));
      dispatch(lastPlayed("updateDuration", audioPlayer.current.duration));

      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);

      setIsPlaying(true);

      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }, 500);
  };

  const notify = () => {
    toast({
      title: "Select an Audio.",
      description: "You need to select an audio to play.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
    audioSource,
  ]);

  return (
    <Box w="100%">
      <Box>
        <Stack
          py="10px"
          px={{ base: "20px", md: "100px" }}
          direction={["column", "row"]}
        >
          <Box>
            <HStack>
              <FaIdBadge />
              <Text fontSize="19px" fontWeight="500" color="#000000">
                Instaread
              </Text>
            </HStack>
          </Box>

          <Spacer />
          <Stack spacing="25px" direction={["column", "row"]}>
            <Box>
              <Text fontSize="19px" fontWeight="500" color="#8f95a3">
                Discover
              </Text>
            </Box>
            <Box>
              <Text fontSize="19px" fontWeight="500" color="#8f95a3">
                Search
              </Text>
            </Box>
            <Box>
              <Text fontSize="19px" fontWeight="500" color="#009aeb">
                Try Instaread
              </Text>
            </Box>
            <Box>
              <HStack p="0px">
                <Text fontSize="19px" fontWeight="500" color="#8f95a3">
                  Login
                  {/* <Box as="span">
                </Box> */}
                </Text>
                <MdArrowDropDown />
              </HStack>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box w="100%" pt="40px" bg="#f7f7f7" h="550px">
        <Box px={{ base: "20px", md: "90px" }}>
          <Stack
            spacing="50px"
            alignItems="center"
            direction={["column", "row"]}
          >
            <Box w={{ base: "100%", md: "242px" }}>
              <Image w="100%" src="/image1.png" />
            </Box>
            <Box>
              <Text
                fontWeight="bold"
                fontSize="36px"
                fontFamily="SFProDisplay"
                color="#000000"
              >
                Astrophysics for people in hurry's Summary
              </Text>
              <Text
                mt="5px"
                fontSize="23px"
                fontFamily="SFProDisplay"
                color="#000"
              >
                Key Insights & Analysis
              </Text>
              <Text
                mt="5px"
                fontWeight="500"
                fontSize="18px"
                fontFamily="SFProDisplay"
                color="#8f95a3"
              >
                Kelly Brogan, MD with Kristin Loberg
              </Text>
              <Box w="100%" mt="40px">
                <Divider w="78%" mb="5px" />
                <Stack spacing="30px" direction={["column", "row"]}>
                  <HStack>
                    <Image src="/read.png" />
                    <Text
                      fontSize="16px"
                      fontFamily="SFProDisplay"
                      fontWeight="500"
                      color="#3a4649"
                    >
                      18 min read
                    </Text>
                  </HStack>
                  <HStack>
                    <Image src="/audio.png" />
                    <Text
                      fontSize="16px"
                      fontFamily="SFProDisplay"
                      fontWeight="500"
                      color="#3a4649"
                    >
                      14 min listen
                    </Text>
                  </HStack>
                  <HStack>
                    <Image src="/group.png" />
                    <Text
                      fontSize="16px"
                      fontFamily="SFProDisplay"
                      fontWeight="500"
                      color="#3a4649"
                    >
                      Add to Library
                    </Text>
                  </HStack>
                  <HStack>
                    <Image src="/group2.png" />
                    <Text
                      fontSize="16px"
                      fontFamily="SFProDisplay"
                      fontWeight="500"
                      color="#3a4649"
                    >
                      Buy Books
                    </Text>
                  </HStack>
                </Stack>
                <Divider w="78%" mt="5px" />
              </Box>
              <Stack mt="35px" direction={["column", "row"]}>
                <Button
                  fontFamily="SFProDisplay"
                  fontSize="15px"
                  h="32px"
                  w="145px"
                  color="#f7f7f7"
                  bg="#8f95a3"
                >
                  Business & Finance
                </Button>
                <Button
                  fontFamily="SFProDisplay"
                  fontSize="15px"
                  h="32px"
                  w="145px"
                  color="#f7f7f7"
                  bg="#8f95a3"
                >
                  Business & Finance
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box px={{ base: "5px", md: "70px" }}>
          <Box
            pl={{ base: "5px", md: "20px" }}
            pt="10px"
            rounded="8px"
            mt="40px"
            bg="white"
          >
            <Tabs>
              <TabList overflowY={{ base: "auto", md: "initial" }} gap={"45px"}>
                <Tab
                  fontSize="20px"
                  color="#c2c6c7"
                  fontWeight="bold"
                  _selected={{
                    color: "#3a4649",
                    fontWeight: "bold",
                    borderBottom: "2px solid #3c8de4",
                  }}
                >
                  <HStack>
                    <Text>Summary</Text>
                    <Image src="/padlock.png" />
                  </HStack>
                </Tab>
                <Tab
                  fontSize="20px"
                  color="#c2c6c7"
                  fontWeight="bold"
                  _selected={{
                    color: "#3a4649",
                    fontWeight: "bold",
                    borderBottom: "2px solid #3c8de4",
                  }}
                >
                  Insights
                </Tab>
                <Tab
                  fontSize="20px"
                  color="#c2c6c7"
                  fontWeight="bold"
                  _selected={{
                    color: "#3a4649",
                    fontWeight: "bold",
                    borderBottom: "2px solid #3c8de4",
                  }}
                >
                  Quotes
                </Tab>
                <Tab
                  fontSize="20px"
                  color="#c2c6c7"
                  fontWeight="bold"
                  _selected={{ color: "#3a4649", fontWeight: "bold" }}
                >
                  Community
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel pt="0px">
                  <Box>
                    <Stack
                      spacing="40px"
                      w="100%"
                      direction={["column", "row"]}
                    >
                      <Box w={{ base: "100%", md: "60%" }}>
                        <Text
                          fontFamily="Georgia"
                          fontSize="28px"
                          fontWeight="bold"
                          mt="30px"
                        >
                          Overview
                        </Text>
                        <Text
                          color="#3a4649"
                          fontSize="22px"
                          lineHeight="1.64"
                          fontFamily="Georgia"
                        >
                          Robert Wright’s Why Buddhism Is True: The Science and
                          Philosophy of Meditation and Enlightenment (2017)
                          considers Buddhism through the lens of evolutionary
                          psychology, a discipline that regards natural
                          selection as the provenance of many mental traits.
                          Focusing on his personal experience with mindfulness
                          meditation, Wright describes a path to truth, using
                          ideas from the realms of psychology and modern,
                          scientifically influenced philosophy to illuminate
                          ancient wisdom. Most people are profoundly out of
                          touch with the nature of objective reality. The human
                          brain has been wired by evolution to experience the
                          world in a deeply subjective, distorted way. Human
                          genes have been programmed to propagate the species,
                          not perceive truth or attain lasting happiness. People
                          seek happiness under the false assumption that one day
                          they can attain it permanently. But happiness is
                          fleeting, in part because of how the brain experiences
                          it, and in part due to inevitable change and the
                          passage of time. Humans are caught in the cycle of
                          seeking out pleasurable...
                        </Text>
                      </Box>
                      <Box
                        bg="#f7f7f7"
                        // h="300px"
                        w={{ base: "100%", md: "40%" }}
                        pl={{ base: "20px", md: "50px" }}
                        // pt="40px"
                      >
                        <Text
                          mt="30px"
                          fontWeight="bold"
                          fontSize="20px"
                          fontFamily="SFProDisplay"
                          letterSpacing="normal"
                        >
                          Audiobook
                        </Text>

                        <Box
                          px={{ base: "5px", md: "15px" }}
                          h="100px"
                          rounded="10px"
                          w={{ base: "95%", md: "80%" }}
                          bg="#4d4d4d"
                          mt="10px"
                        >
                          <HStack w="100%">
                            <Box w={{ base: "100%", md: "80%" }}>
                              <Text
                                textAlign="center"
                                fontWeight="bold"
                                color="white"
                                fontSize="16px"
                              >
                                {title}
                              </Text>
                              <HStack>
                                {isPlaying ? (
                                  <Box
                                    border="1px solid #008deb"
                                    w="35px"
                                    rounded="100%"
                                    bg="white"
                                    onClick={PauseAndPlay}
                                    cursor="pointer"
                                  >
                                    <FaPauseCircle
                                      bg="white"
                                      size="100%"
                                      color="#008deb"
                                    />
                                  </Box>
                                ) : (
                                  <Box
                                    border="1px solid #008deb"
                                    w="35px"
                                    rounded="100%"
                                    bg="white"
                                    cursor="pointer"
                                    onClick={PauseAndPlay}
                                  >
                                    <FaPlayCircle
                                      bg="white"
                                      size="100%"
                                      color="#008deb"
                                    />
                                  </Box>
                                )}

                                <input
                                  style={{ height: "4px", cursor: "pointer" }}
                                  defaultValue="0"
                                  type="range"
                                  ref={progressBar}
                                  onChange={handleAudioPosition}
                                />
                                <Text color="#8f95a3">
                                  {duration
                                    ? timeCalculator(duration)
                                    : " 00:00"}
                                </Text>
                              </HStack>
                            </Box>
                            <Spacer />
                            <Box w="87px">
                              <Image w="100%" h="100px" src="/audio-img.png" />
                            </Box>
                          </HStack>
                        </Box>

                        <audio
                          color="red"
                          ref={audioPlayer}
                          src={audioSource}
                          style={{ color: "green" }}
                        />

                        <Box mt="20px" w="100%">
                          <Text
                            fontFamily="SFProDisplay"
                            fontSize="20px"
                            fontWeight="bold"
                            mb="15px"
                          >
                            Table of contents
                          </Text>
                          {Audios.map((audio, i) => (
                            <Box
                              mt="5px"
                              key={i}
                              w={{ base: "100%", md: "60%" }}
                              cursor="pointer"
                              onClick={() =>
                                changeAudio(audio.src, audio.title)
                              }
                            >
                              <HStack w={{ base: "80%", md: "100%" }}>
                                <Text color="#3a4649" fontSize="20px">
                                  {i + 1}
                                </Text>
                                <Text pl="10px" fontSize="16px">
                                  {audio.title}
                                </Text>
                                <Spacer />
                                <BsPlayCircle cursor="pointer" />
                              </HStack>
                              <Divider color="#5c626e" />
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>Insights</p>
                </TabPanel>
                <TabPanel>
                  <p>Quotes</p>
                </TabPanel>
                <TabPanel>
                  <p>Community</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
