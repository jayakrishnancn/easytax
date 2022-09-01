class HRA {
  HRAReceived = 0;
  A_10perBaseAndDA = 0;
  B_50PerBaseAndDA = 0;
  current = -1;
  baseAndDA = 0;
  rentPaid = 0;

  constructor(
    baseAndDA: number,
    HRAReceived: number,
    rentPaidPermonth: number,
    isMetro: boolean
  ) {
    const rentPaid = rentPaidPermonth * 12;
    this.baseAndDA = baseAndDA;
    this.HRAReceived = HRAReceived;
    this.rentPaid = rentPaid;
    this.A_10perBaseAndDA = Math.max(0, rentPaid - (10 / 100) * baseAndDA);
    const rate = isMetro ? 50 : 40;
    this.B_50PerBaseAndDA = Math.max(0, (rate / 100) * baseAndDA);
    this.HRAReceived = Math.max(0, HRAReceived);

    this.current = [
      this.A_10perBaseAndDA,
      this.B_50PerBaseAndDA,
      this.HRAReceived,
    ].indexOf(
      Math.min(this.A_10perBaseAndDA, this.B_50PerBaseAndDA, this.HRAReceived)
    );
  }
  getMinAC() {
    return Math.min(this.B_50PerBaseAndDA, this.HRAReceived);
  }
  calcaulteMaxHRA() {
    return Math.max(
      0,
      Math.min(this.A_10perBaseAndDA, this.B_50PerBaseAndDA, this.HRAReceived)
    );
  }
  optimalRent(): number {
    return (this.getMinAC() + 0.1 * this.baseAndDA) / 12;
  }
}

export default HRA;
