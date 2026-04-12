function PayrollForm() {
  return (
    <form>
      <label htmlFor="hours">Encrypted Hours</label>
      <input id="hours" name="hours" type="number" min="0" placeholder="e.g. 40" />

      <label htmlFor="rate">Encrypted Rate</label>
      <input id="rate" name="rate" type="number" min="0" placeholder="e.g. 25" />

      <button type="button">Encrypt & Submit Payroll</button>
    </form>
  );
}

export default PayrollForm;
