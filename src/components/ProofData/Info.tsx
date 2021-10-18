import { Doc, DocumentData } from "./index";
import { Table, Header, TD, TR } from "./style";

interface Props {
  Document: Doc;
}

const mapRows = ({ Key, Value }: DocumentData) => {
  return (
    <TR key={Key}>
      <TD>{Key}</TD>
      <TD>{Value}</TD>
    </TR>
  );
};

const Info = ({ Document }: Props) => {
  return (
    <Table>
      <thead>
        <tr>
          <Header>Key Properties</Header>
          <Header>Value</Header>
        </tr>
      </thead>
      <tbody>{Document.Data.map(mapRows)}</tbody>
    </Table>
  );
};

export default Info;
