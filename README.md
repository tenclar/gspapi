# gsp
Guia de Serviços Públicos

### 🔽 Requisitos
1. Ter o NodeJs e Yarn instalado
2. Ter banco de dados PostgreSQL em execução , pode ser com docker
3. comando gerar container posgre: docker run --name posrgresdb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

### :rocket: Iniciando com o backend
1. ``cd gspapi``
2. ``yarn | para instalar as bibliotecas dependentes do projeto  ``
3. ``Criar o arquivo .env com base no .env.example``
4. ``yarn typerom migration: run | para criar as tabelas ``
5. ``yarn dev:server | iniciar projeto``

### 💻 Iniciando com o Front-end
1. `` git clone http://gitlab.acre.gov.br/oca/gspweb``
2. ``cd gspweb``
3. ``yarn``
4. ``yarn start``
