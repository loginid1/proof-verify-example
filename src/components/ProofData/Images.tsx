import { ImageData, Doc } from "./index";
import { Img, Images, Title } from "./style";

interface Props {
  Document: Doc;
  CurrentFacialImage: ImageData;
}

const toBase64Src = (base64Data: string) =>
  `data:image/jpeg;base64,${base64Data}`;

const mapImage = ({ Data, Description }: ImageData, index: number) => {
  return <Img key={index} alt={Description} src={toBase64Src(Data)} />;
};

const Info = ({ Document, CurrentFacialImage }: Props) => {
  return (
    <div>
      <Title>Images of Interest</Title>
      <Images>
        {Document.AdditionalImages.map(mapImage)}
        <Img
          alt={CurrentFacialImage.Description}
          src={toBase64Src(CurrentFacialImage.Data)}
        />
      </Images>
    </div>
  );
};

export default Info;
