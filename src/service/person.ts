import * as cinerino from '@cinerino/api-abstract-client';
import { ACCEPTED, CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';

export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw | factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;
export type IPerson = factory.person.IProfile & factory.person.IPerson;

/**
 * ユーザーサービス
 */
export class PersonService extends cinerino.service.Person {
    /**
     * クレジットカード検索
     */
    public async findCreditCards(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
    }): Promise<factory.paymentMethod.paymentCard.creditCard.ICheckedCard[]> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/creditCards`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * クレジットカード追加
     */
    public async addCreditCard(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
        /**
         * credit card info
         * クレジットカード情報(情報の渡し方にはいくつかパターンがあるので、型を参照すること)
         */
        creditCard: ICreditCard;
    }): Promise<factory.paymentMethod.paymentCard.creditCard.ICheckedCard> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/creditCards`,
            method: 'POST',
            body: params.creditCard,
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }

    /**
     * クレジットカード削除
     */
    public async deleteCreditCard(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
        /**
         * cardSeq
         * カード連番
         */
        cardSeq: string;
    }): Promise<void> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        await this.fetch({
            uri: `/people/${id}/creditCards/${params.cardSeq}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座開設
     */
    public async openAccount(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
        /**
         * 口座名義
         */
        name: string;
    }): Promise<factory.pecorino.account.IAccount<factory.accountType.Point>> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/accounts`,
            method: 'POST',
            body: {
                name: params.name
            },
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }

    /**
     * 口座開解約
     * 口座の状態を変更するだけで、ユーザーの所有する口座リストから削除はされません。
     * 解約された口座で取引を進行しようとすると400エラーとなります。
     */
    public async closeAccount(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        await this.fetch({
            uri: `/people/${id}/accounts/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座照会
     */
    public async findAccounts(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
    }): Promise<factory.pecorino.account.IAccount<factory.accountType.Point>[]> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/accounts`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 口座取引履歴検索
     */
    public async searchAccountMoneyTransferActions(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<factory.pecorino.action.transfer.moneyTransfer.IAction<factory.accountType.Point>[]> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/accounts/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 所有権を検索する
     * 座席予約、所属会員プログラム、などユーザーの資産(モノ、サービス)を検索します。
     */
    public async searchOwnershipInfos<T extends factory.ownershipInfo.IGoodType>(
        params: factory.ownershipInfo.ISearchConditions<T>
    ): Promise<factory.ownershipInfo.IOwnershipInfo<T>[]> {
        return this.fetch({
            uri: `/people/${params.ownedBy}/ownershipInfos/${params.goodType}`,
            method: 'GET',
            qs: {
                ownedAt: params.ownedAt
            },
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 会員プログラムに登録する
     */
    public async registerProgramMembership(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
        /**
         * 会員プログラムID
         */
        programMembershipId: string;
        /**
         * 会員プログラムに対するオファー識別子
         */
        offerIdentifier: string;
        /**
         * 販売者タイプ
         */
        sellerType: factory.organizationType;
        /**
         * 販売者ID
         */
        sellerId: string;
    }): Promise<factory.task.ITask<factory.taskName.RegisterProgramMembership>> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/programMembership/register`,
            method: 'PUT',
            body: {
                programMembershipId: params.programMembershipId,
                offerIdentifier: params.offerIdentifier,
                sellerType: params.sellerType,
                sellerId: params.sellerId
            },
            expectedStatusCodes: [ACCEPTED]
        }).then(async (response) => response.json());
    }

    /**
     * 会員プログラム登録解除
     */
    public async unRegisterProgramMembership(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * @deprecated `id`パラメータを使ってください
         */
        personId?: string;
        /**
         * 会員プログラム所有権識別子
         */
        ownershipInfoIdentifier: string;
    }): Promise<factory.task.ITask<factory.taskName.UnRegisterProgramMembership>> {
        const id = (params.personId !== undefined)
            ? /* istanbul ignore next */ params.personId
            : (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/programMembership/${params.ownershipInfoIdentifier}/unRegister`,
            method: 'PUT',
            body: {},
            expectedStatusCodes: [ACCEPTED]
        }).then(async (response) => response.json());
    }
}
