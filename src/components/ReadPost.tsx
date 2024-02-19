import {
  Heading,
  Text,
  Image,
  Flex,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";
import Divider from "./Divider";
import Comment from "./Comment";

const ReadPost = () => {
  const smallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="center"
        direction="column"
      >
        <Image src={image} h="500px" w="100%" objectFit="cover"></Image>
        <Flex
          bg="lightBg"
          top="500px"
          maxW="800px"
          p={5}
          m={smallScreen ? "" : 5}
          mt="-200px"
          justify="center"
          direction="column"
          gap={5}
        >
          <Flex direction="column" align="center" gap={5}>
            <Heading color="headerText">Climbing in a Changing Climate</Heading>
            <Text>
              <strong>David Forbes</strong> - Mon 19th Feb 2024
            </Text>
          </Flex>
          {/* <Text fontSize="xl" fontWeight="500" color="headerText">
            <em>
              Navigating the Impact of Environmental Shifts on the Climbing
              Community
            </em>
          </Text> */}
          <Text fontSize="lg">
            As climbers, we are intimately connected to the natural world. From
            scaling majestic rock faces to ascending icy peaks, our pursuits
            take us to some of the most breathtaking environments on Earth.
            However, as our planet undergoes profound changes due to climate
            change, the very landscapes we cherish and rely on are being altered
            in ways that profoundly affect our climbing experiences. In this
            blog post, we'll explore how climate change is impacting the
            climbing community and discuss the importance of collective action
            to mitigate its effects.
          </Text>
          <Text fontSize="lg">
            One of the most visible effects of climate change on climbing is the
            rapid retreat of glaciers and the thawing of permafrost in alpine
            environments. For climbers who venture into these regions, this
            means encountering unstable terrain, increased rockfall, and altered
            route conditions. Traditional climbing routes may become more
            hazardous or even impassable as ice melts and rock stability is
            compromised. Moreover, the loss of glaciers diminishes the aesthetic
            beauty and challenge of classic climbs, altering the very essence of
            these revered routes.
          </Text>
          <Text fontSize="lg">
            Climate change is also causing shifts in weather patterns, leading
            to changes in climbing seasons. Warmer temperatures and
            unpredictable weather can shorten climbing windows or make certain
            areas inaccessible for longer periods. Climbers must adapt to these
            shifting conditions by adjusting their schedules and seeking out
            alternative climbing destinations. However, for many climbers,
            particularly those who rely on specific seasons for expeditions or
            competitions, these changes pose significant challenges and may
            require reevaluation of long-term climbing goals.
          </Text>
          <Text fontSize="lg">
            Extreme weather events, such as hurricanes, wildfires, and flash
            floods, are becoming more frequent and intense due to climate
            change. These events not only pose immediate dangers to climbers but
            also cause long-term damage to climbing infrastructure and natural
            landscapes. Rockfall, erosion, and vegetation loss can alter
            climbing routes and access trails, requiring extensive maintenance
            and restoration efforts by the climbing community. Additionally, the
            threat of natural disasters necessitates heightened awareness and
            preparedness among climbers, emphasizing the importance of safety
            protocols and risk management practices.
          </Text>
          <Text fontSize="lg">
            In the face of these challenges, climbers are increasingly
            recognizing the importance of conservation and advocacy efforts to
            protect the environments we love to explore. Local climbing
            organizations, environmental groups, and outdoor brands are joining
            forces to address climate change through initiatives such as carbon
            offset programs, sustainable climbing practices, and land
            conservation projects. By supporting these initiatives and
            participating in community-led efforts, climbers can contribute to
            preserving the places where we climb for future generations.
          </Text>
          <Text fontSize="lg">
            The impacts of climate change on the climbing community are profound
            and multifaceted, affecting everything from route conditions to
            access to climbing destinations. As stewards of the natural world,
            climbers have a responsibility to address these challenges through
            collective action and advocacy. By advocating for climate action,
            supporting conservation efforts, and practicing sustainable climbing
            habits, we can work towards preserving the environments that inspire
            and challenge us. Together, we can ensure that future generations of
            climbers have the opportunity to experience the beauty and thrill of
            climbing in a world where the mountains remain resilient and
            unspoiled.
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" maxW="1200px" mx="auto" gap={5}>
        <Divider />
        <Flex
          maxW="800px"
          p={5}
          mx="auto"
          justify="center"
          direction="column"
          gap={5}
        >
          <Center>
            <Heading fontSize="3xl">Comments</Heading>
          </Center>
          <Comment
            commentText={
              "A really long comment with lots of content, really just going on and on about how good this articale was and a bit more. Even more text added on now."
            }
          />
          <Comment commentText={"Shorter commemt."} />
        </Flex>
      </Flex>
    </>
  );
};

export default ReadPost;
