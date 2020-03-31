import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Checkbox = ({ label, checked, onChange }) => (
  <FormGroup check>
    <Label check>
      <Input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </Label>
  </FormGroup>
);

export default Checkbox;
