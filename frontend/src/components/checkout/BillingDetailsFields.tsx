import styled from "styled-components";
import { AllCountries } from "../../globals";
import { Box, Dropdown, TextField } from "../../Jet";


const BillingDetailsStyle = styled.div.attrs((props: any) => props)`

  @media (max-width: 560px) {
    .section {
      flex-direction: column;
      margin-bottom: 0.2rem;
      gap: 0.2rem;
    }
  }
`;

const BillingDetailsFields = ({ country, onSetCountry }: { country: string, onSetCountry: (value: string) => any }) => {
  return (
    <BillingDetailsStyle>
      <Box className="section" spacing="1rem" justifyContent="space-between">
        <TextField
          name="name"
          placeholder="Name"
          type="text"
          required
          fullWidth
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          required
          fullWidth
        />
      </Box>

      <Box className="section" spacing="1rem" justifyContent="space-between">
        <TextField
          name="address"
          placeholder="Address"
          type="text"
          required
          fullWidth
        />
        <TextField
          name="city"
          placeholder="City"
          type="text"
          required
          fullWidth
        />
      </Box>

      <Box className="section" spacing="1rem" justifyContent="space-between">
        <TextField
          name="state"
          placeholder="State/Province"
          type="text"
          required
          fullWidth
        />
        <TextField
          name="zip"
          placeholder="ZIP/Postal Code"
          type="text"
          required
          fullWidth
        />
      </Box>

      <Dropdown selected={{ label: country }} onSelectOption={(v) => onSetCountry(v.label)} searchable values={[
        ...AllCountries.map((c) => ({ label: c.name }))
      ]}
      />
    </BillingDetailsStyle>
  );
};

export default BillingDetailsFields;
