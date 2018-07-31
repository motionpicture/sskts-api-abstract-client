// tslint:disable:no-implicit-dependencies

/**
 * placeOrder transaction client.service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../../index';

import { StubAuthClient } from '../../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('placeOrder transaction client.service', () => {
    let sandbox: sinon.SinonSandbox;
    let transactions: client.service.transaction.PlaceOrder;

    before(() => {
        const auth = new StubAuthClient();
        transactions = new client.service.transaction.PlaceOrder({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('取引開始結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.start({
            expires: new Date(),
            sellerId: 'sellerId',
            passportToken: 'passportToken'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席仮予約結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.createSeatReservationAuthorization({
            transactionId: 'transactionId',
            eventIdentifier: 'eventIdentifier',
            offers: []
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席予約取消結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancelSeatReservationAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席予約変更結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.changeSeatReservationOffers({
            transactionId: 'transactionId',
            actionId: 'actionId',
            eventIdentifier: 'eventIdentifier',
            offers: [<any>{}]
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカードオーソリ結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.createCreditCardAuthorization({
            transactionId: 'transactionId',
            orderId: 'orderId',
            amount: 123,
            method: 'method',
            creditCard: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカードオーソリ取消結果が期待通り', async () => {
        const data = undefined;
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancelCreditCardAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('ムビチケ追加結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.createMvtkAuthorization({
            transactionId: 'transactionId',
            mvtk: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('ムビチケ取消結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancelMvtkAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('購入者情報登録結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.setCustomerContact({
            transactionId: 'transactionId',
            contact: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('取引確定結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.confirm({
            transactionId: 'transactionId'
        });
        assert.deepEqual(result, data);
    });

    it('メール通知結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.sendEmailNotification({
            transactionId: 'transactionId',
            emailMessageAttributes: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('Pecorino口座承認アクションの結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.createPecorinoPaymentAuthorization({
            transactionId: 'transactionId',
            amount: 1234,
            fromAccountNumber: '12345'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('Pecorino口座オーソリ取消結果が期待通り', async () => {
        const data = undefined;
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancelPecorinoPaymentAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('Pecorinoインセンティブ承認アクションの結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.createPecorinoAwardAuthorization({
            transactionId: 'transactionId',
            amount: 1234,
            toAccountNumber: '12345'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('Pecorinoインセンティブオーソリ取消結果が期待通り', async () => {
        const data = undefined;
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancelPecorinoAwardAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('取引中止結果が期待通り', async () => {
        const data = {};
        sandbox.mock(transactions).expects('fetch').once().resolves(data);

        const result = await transactions.cancel({
            transactionId: 'transactionId'
        });
        assert.deepEqual(result, data);
    });
});
