var expect = chai.expect

describe("PRUEBAS CSV", function () {
  describe("Pruebas para la función calculate()", function() {
    it("Entrada con elementos entrecomillados", function() {
      var input = '"Esto", "son", "elementos", "entrecomillados"';
      var fun_cal = calculate(input);
      expect(fun_cal[0].items.toString()).to.equal('Esto,son,elementos,entrecomillados');
    });

    it ("Entrada con elementos no entrecomillados", function() {
      var input = 'Esto, son, elementos, no, entrecomillados'
      var fun_cal = calculate(input);
      expect(fun_cal[0].items.toString()).to.equal('Esto,son,elementos,no,entrecomillados');
    });

    it ("Entrada con un elemento vacío", function() {
      var input = '"Elemento", "vacío", ""'
      var fun_cal = calculate(input);
      expect(fun_cal[0].items.toString()).to.equal('Elemento,vacío,');
    });

    it ("Entrada con números entrecomillados", function() {
      var input = '"0", "1", "2", "3"';
      var fun_cal = calculate(input);
      expect(fun_cal[0].items.toString()).to.equal('0,1,2,3');
    });

    it ("Entrada con números no entrecomillados", function() {
      var input = '0, 1, 2, 3';
      var fun_cal = calculate(input);
    expect(fun_cal[0].items.toString()).to.equal('0,1,2,3');    
    });

    it("Entrada como una coma en uno de los elementos", function() {
      var input = '"Hay", "una,", "coma"';
      var fun_cal = calculate(input);
      expect(fun_cal[0].items.toString()).to.equal('Hay,una,,coma');
    });

    it("Entrada con un espacio en uno de los elementos", function() {
      var input = '"Hay", "un ", "espacio"';
      var fun_cal = calculate(input);
      expect(fun_cal[0].items.toString()).to.equal('Hay,un ,espacio');
    });
  });
});