class ContaBancaria {
    protected titular: string;
    protected saldo: number;

    constructor(titular: string, saldoInicial: number = 0) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public depositar(valor: number): void {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`${this.titular} depositou R$${valor}. Saldo atual: R$${this.saldo}`);
        } else {
            console.log("Valor de depósito inválido.");
        }
    }

    public sacar(valor: number): boolean {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`${this.titular} sacou R$${valor}. Saldo atual: R$${this.saldo}`);
            return true;
        } else {
            console.log("Saque não permitido.");
            return false;
        }
    }

    public getSaldo(): number {
        return this.saldo;
    }
}

class ContaCorrente extends ContaBancaria {
    private limite: number;

    constructor(titular: string, saldoInicial: number, limite: number) {
        super(titular, saldoInicial);
        this.limite = limite;
    }

    public sacar(valor: number): boolean {
        if (valor > 0 && valor <= (this.saldo + this.limite)) {
            this.saldo -= valor;
            console.log(`${this.titular} sacou R$${valor}. Saldo atual: R$${this.saldo}`);
            return true;
        } else {
            console.log("Saque excede o limite disponível.");
            return false;
        }
    }
}

class ContaPoupanca extends ContaBancaria {
    private taxaJuros: number;

    constructor(titular: string, saldoInicial: number, taxaJuros: number) {
        super(titular, saldoInicial);
        this.taxaJuros = taxaJuros;
    }

    public aplicarJuros(): void {
        const juros = this.saldo * this.taxaJuros / 100;
        this.saldo += juros;
        console.log(`${this.titular} recebeu R$${juros.toFixed(2)} de juros. Saldo atual: R$${this.saldo}`);
    }
}


const conta1 = new ContaCorrente("João", 1000, 500);
const conta2 = new ContaPoupanca("Maria", 2000, 2);

conta1.depositar(500);
conta1.sacar(2000);
conta2.aplicarJuros();
conta2.sacar(500);
