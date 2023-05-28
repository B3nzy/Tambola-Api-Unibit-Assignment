function TambolaTicketGeneration() {
  let tambolaTicket = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let tambolaTicketFilledRows = [0, 0, 0];

  let tambolaTicketDigitArray = [];
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9));
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 10);
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 20);
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 30);
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 40);
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 50);
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 60);
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 70);
  tambolaTicketDigitArray.push(Math.ceil(Math.random() * 9) + 80);

  let temp = [];
  let i = 0;
  while (i < 6) {
    let t1 = Math.floor(Math.random() * 9);
    let t2 = t1 * 10 + Math.ceil(Math.random() * 9);
    if (!temp.includes(t1) && !tambolaTicketDigitArray.includes(t2)) {
      temp.push(t1);
      tambolaTicketDigitArray.push(t2);
      i++;
    }
  }

  tambolaTicketDigitArray.sort(function (a, b) {
    return a - b;
  });

  i = 0;
  let flag = 0;
  while (i < 15) {
    flag++;
    if (
      Math.floor(tambolaTicketDigitArray[i] / 10) ===
      Math.floor(tambolaTicketDigitArray[i + 1] / 10)
    ) {
      let rndNo1 = Math.floor(Math.random() * 3);
      let rndNo2 = Math.floor(Math.random() * 3);
      while (rndNo1 === rndNo2) {
        rndNo2 = Math.floor(Math.random() * 3);
      }

      if (
        tambolaTicketFilledRows[rndNo1] < 5 &&
        tambolaTicketFilledRows[rndNo2] < 5
      ) {
        if (rndNo1 < rndNo2) {
          tambolaTicket[rndNo1][Math.floor(tambolaTicketDigitArray[i] / 10)] =
            tambolaTicketDigitArray[i];
          tambolaTicketFilledRows[rndNo1]++;
          i++;
          tambolaTicket[rndNo2][Math.floor(tambolaTicketDigitArray[i] / 10)] =
            tambolaTicketDigitArray[i];
          tambolaTicketFilledRows[rndNo2]++;
          i++;
        } else {
          tambolaTicket[rndNo2][
            Math.floor(tambolaTicketDigitArray[i + 1] / 10)
          ] = tambolaTicketDigitArray[i];
          tambolaTicketFilledRows[rndNo2]++;
          tambolaTicket[rndNo1][Math.floor(tambolaTicketDigitArray[i] / 10)] =
            tambolaTicketDigitArray[i + 1];
          tambolaTicketFilledRows[rndNo1]++;
          i++;
          i++;
        }
      }
    } else {
      let rndNo = Math.floor(Math.random() * 3);
      if (tambolaTicketFilledRows[rndNo] < 5) {
        tambolaTicket[rndNo][Math.floor(tambolaTicketDigitArray[i] / 10)] =
          tambolaTicketDigitArray[i];
        tambolaTicketFilledRows[rndNo]++;
        i++;
      }
    }
    if (flag >= 100) {
      return 0;
    }
  }

  return tambolaTicket;
}

module.exports = TambolaTicketGeneration;
