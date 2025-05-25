CREATE TABLE func (


                              nome VARCHAR(200),
                              cpf BIGINT PRIMARY KEY ,
                              rg VARCHAR(9),
                              idade INT,
                              salario NUMERIC(7,2),
                              rua VARCHAR(200),
                              numero BIGINT,
                              bairro VARCHAR (50),
                              cidade VARCHAR(200),
                              estado VARCHAR(2),
                              cargo VARCHAR(10) CHECK (cargo IN ('CAIXA','REPOSITOR','LIMPEZA','GERENTE','ESTAGIARIO')),
                              estadocivil VARCHAR(8) CHECK (estadocivil IN ('SOLTEIRO','CASADO'))
);