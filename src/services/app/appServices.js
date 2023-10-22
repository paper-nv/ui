import instance from "../index";

const appServices = {
  // company
  async createCompany(payload) {
    return instance.post("company/create", payload);
  },
  async companyList(params) {
    return instance.get(`company/get?${params}`);
  },
  async deleteCompany(params) {
    return instance.delete(`company/delete/${params}`);
  },

  //customer
  async createCustomer(payload) {
    return instance.post("customer/create", payload);
  },
  async customerList(params) {
    return instance.get(`customer/get?${params}`);
  },
  async deleteCustomer(params) {
    return instance.delete(`customer/delete/${params}`);
  },

  //invoice
  async createInvoice(payload) {
    return instance.post(`invoice/create`, payload);
  },
  async updateInvoice(payload) {
    return instance.put(`invoice/update`, payload);
  },
  async deleteInvoice(params) {
    return instance.delete(`invoice/delete/${params}`);
  },
  async invoiceList(params) {
    return instance.get(`invoice/get?${params}`);
  },
  async invoiceStats() {
    return instance.get(`invoice/stats`);
  },
};

export default Object.freeze(appServices);
