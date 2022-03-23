/// <reference types="Cypress" />

describe('Centrar de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('verifica o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = "Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste"
        cy.get('#firstName').type('Gabriel');
        cy.get('#lastName').type('Jundurian');
        cy.get('#email').type('example@example.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        // cy.get('.button').click();
        cy.get('button[type="submit"]').click();


        cy.get('.success')
            .should('be.visible')
            .and("contain", "Mensagem enviada com sucesso.");

    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Gabriel');
        cy.get('#lastName').type('Jundurian');
        cy.get('#email').type('example');
        cy.get('#open-text-area').type("hahaha");
        cy.get('button[type="submit"]').click();


        cy.get('.error')
            .should('be.visible')
            .and("contain", "Valide os campos obrigatórios!");
    });

    it('campo telefone continua vazio quando preenchido com valor não numérico', () => {

        cy.get('#phone')
            .type("hahahaha")
            .should('be.empty');

    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#firstName').type('Gabriel');
        cy.get('#lastName').type('Jundurian');
        cy.get('#email').type('example@example.com');
        cy.get('#open-text-area').type("hahaha");
        cy.get('#phone-checkbox').check();

        cy.get('button[type="submit"]').click();



        cy.get('.error')
            .should('be.visible')
            .and("contain", "Valide os campos obrigatórios!");

    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName').type('Gabriel')
            .should('have.value', "Gabriel")
            .clear()
            .should('be.empty');

        cy.get('#lastName').type('Gabriel')
            .should('have.value', "Gabriel")
            .clear()
            .should('be.empty');

        cy.get('#email').type('example@example.com')
            .should('have.value', "example@example.com")
            .clear()
            .should('be.empty');

        cy.get('#phone').type('232323')
            .should('have.value', "232323")
            .clear()
            .should('be.empty');


    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.get('button[type="submit"]').click();

        cy.get('.error')
            .should('be.visible')
            .and("contain", "Valide os campos obrigatórios!");
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        // cy.get('button[type="submit"]').click();
        cy.contains('button','Enviar').click()

        cy.get('.success')
            .should('be.visible')
            .and("contain", "Mensagem enviada com sucesso.");
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
        .select("YouTube")
        .should('have.value',"youtube");
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
        .select("mentoria")
        .should('have.value',"mentoria");
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
        .select(1)
        .should('have.value',"blog");
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value="feedback"]').check()
        .should('be.checked')
        .should('have.value','feedback');
    });
    
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#email-checkbox').check();
        cy.get('#phone-checkbox').check();

        cy.get('input[type="checkbox"]').uncheck();
        cy.get('input[type="checkbox"]').check();

        cy.get('input[type="checkbox"]').last().uncheck();

        cy.get('input[type="checkbox"]')
        .check() //marca todos
        .should('be.checked')
        .last().uncheck() //desmarca só o último
        .should('not.be.checked')
        ;

    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        });
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        });
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile',{action: 'drag-drop'})
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        });
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
        .should('have.attr','target','_blank');
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    });


});

