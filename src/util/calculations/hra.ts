class HRA {
  C_HRAReceived = 0;
  A_10perBaseAndDa = 0;
  B_50PerBaseAndDA = 0;
  current = -1;
  constructor(baseAndDA = 0, HRAReceived = 0, rentPaid = 0, isMetro = false) {
    this.A_10perBaseAndDa = Math.max(0, rentPaid - (10 / 100) * baseAndDA);
    const rate = isMetro ? 50 : 40;
    this.B_50PerBaseAndDA = Math.max(0, (rate / 100) * baseAndDA);
    this.C_HRAReceived = Math.max(0, HRAReceived);

    this.current = [
      this.A_10perBaseAndDa,
      this.B_50PerBaseAndDA,
      this.C_HRAReceived,
    ].indexOf(
      Math.min(this.A_10perBaseAndDa, this.B_50PerBaseAndDA, this.C_HRAReceived)
    );
  }
  getMinAC() {
    return Math.min(this.B_50PerBaseAndDA, this.C_HRAReceived);
  }
  calcaulteMaxHRA() {
    return Math.max(
      0,
      Math.min(this.A_10perBaseAndDa, this.B_50PerBaseAndDA, this.C_HRAReceived)
    );
  }
}

export default HRA;
