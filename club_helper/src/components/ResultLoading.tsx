import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const ResultLoading = () => {
  return (
    <Card width="50vw" bg="rgb(241, 240, 242)">
      <CardHeader>
        <Skeleton height="20px" width="10vw" />
      </CardHeader>
      <CardBody paddingTop="1px">
        <SkeletonText noOfLines={3} skeletonHeight={5} />
      </CardBody>
      <CardFooter paddingTop="1px" justifyContent="right">
        <Skeleton height="20px" width="10vw" />
      </CardFooter>
    </Card>
  );
};

export default ResultLoading;
