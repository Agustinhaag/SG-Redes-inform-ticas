"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalizeMessage = exports.handleDataIspcube = void 0;
const ispCube_service_1 = require("../service/ispCube.service");
const handleDataIspcube = (tokenIspCube, user, usersIspCube) => __awaiter(void 0, void 0, void 0, function* () {
    const invoices = usersIspCube.map((userIspCube) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield (0, ispCube_service_1.factFetchLink)(tokenIspCube, user, userIspCube.id);
            return { userId: userIspCube.id, invoice: data };
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }));
    const resolvedInvoices = yield Promise.all(invoices);
    const validInvoices = resolvedInvoices.filter((item) => item !== null);
    const invoiceMap = {};
    validInvoices.forEach(({ userId, invoice }) => {
        invoiceMap[userId] = invoice;
    });
    return invoiceMap;
});
exports.handleDataIspcube = handleDataIspcube;
const personalizeMessage = (template, user, invoiceMap) => {
    return template
        .replace(/{{name}}/g, user.name)
        .replace(/{{debt}}/g, user.debt || "N/A")
        .replace(/{{address}}/g, user.address || "N/A")
        .replace(/{{plan_name}}/g, user.plan_name || "N/A")
        .replace(/{{invoices}}/g, invoiceMap[user.id] || "N/A");
};
exports.personalizeMessage = personalizeMessage;
