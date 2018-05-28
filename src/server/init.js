const accountings = require('./controllers/accountings')
const companies = require('./controllers/companies')
const customers = require('./controllers/customers')
const tables = require('./controllers/tables')
const knex = require('./tools/knex')

const data = {
  accountings: [
    { id: 1, companyId: -1, code: '1101', name: 'Cash', safe: 1 },
    { id: 2, companyId: -1, code: '1201', name: 'Bank', safe: 1 },
    { id: 3, companyId: -1, code: '1301', name: 'Receivable', safe: 1 },
    { id: 4, companyId: -1, code: '1401', name: 'Inventory', safe: 1 },
    { id: 5, companyId: -1, code: '1501', name: 'Undue Input VAT', safe: 1 },
    {
      id: 6,
      companyId: -1,
      code: '1601',
      name: 'Accumulated Depreciation',
      safe: 1
    },
    { id: 7, companyId: -1, code: '2101', name: 'Payable', safe: 1 },
    { id: 8, companyId: -1, code: '2201', name: 'VAT Payable', safe: 1 },
    {
      id: 9,
      companyId: -1,
      code: '2301',
      name: 'Withholding Tax Payable',
      safe: 1
    },
    { id: 10, companyId: -1, code: '3101', name: 'Capital', safe: 1 },
    {
      id: 11,
      companyId: -1,
      code: '3201',
      name: 'Accumulate Profit',
      safe: 1
    },
    { id: 12, companyId: -1, code: '3301', name: 'Dividend', safe: 1 },
    { id: 13, companyId: -1, code: '4101', name: 'Revenue', safe: 1 },
    { id: 14, companyId: -1, code: '4201', name: 'Interest', safe: 1 },
    {
      id: 15,
      companyId: -1,
      code: '5101',
      name: 'Cost of good sold',
      safe: 1
    },
    { id: 16, companyId: -1, code: '5201', name: 'Purchases', safe: 1 },
    {
      id: 17,
      companyId: -1,
      code: '5301',
      name: 'Purchase Discounts',
      safe: 1
    },
    { id: 18, companyId: -1, code: '5401', name: 'Salary', safe: 1 },
    { id: 19, companyId: -1, code: '5501', name: 'Advertisement', safe: 1 },
    { id: 20, companyId: -1, code: '5601', name: 'Utility Expense', safe: 1 },
    { id: 21, companyId: -1, code: '5701', name: 'Bank Fees', safe: 1 },
    { id: 22, companyId: -1, code: '5702', name: 'Interest Payable', safe: 1 },
    { id: 23, companyId: -1, code: '5801', name: 'Depreciation', safe: 1 },
    { id: 24, companyId: 1, code: '1101', name: 'เงินสด', safe: 1 },
    { id: 25, companyId: 1, code: '1201', name: 'เงินฝากธนาคาร', safe: 1 },
    { id: 26, companyId: 1, code: '1301', name: 'ลูกหนี้การค้า', safe: 1 },
    { id: 27, companyId: 1, code: '1401', name: 'สินค้าคงเหลือ', safe: 1 },
    {
      id: 28,
      companyId: 1,
      code: '1501',
      name: 'ภาษีซื้อยังไม่ถึงกำหนดชำระ',
      safe: 1
    },
    {
      id: 29,
      companyId: 1,
      code: '1601',
      name: 'ค่าเสื่อมราคาสะสม',
      safe: 1
    },
    { id: 30, companyId: 1, code: '2101', name: 'เจ้าหนี้การค้า', safe: 1 },
    { id: 31, companyId: 1, code: '2201', name: 'ภาษีขาย', safe: 1 },
    {
      id: 32,
      companyId: 1,
      code: '2301',
      name: 'ภาษีเงินได้หัก ณ ที่จ่าย',
      safe: 1
    },
    { id: 33, companyId: 1, code: '3101', name: 'ทุน', safe: 1 },
    { id: 34, companyId: 1, code: '3201', name: 'กำไรสะสม', safe: 1 },
    { id: 35, companyId: 1, code: '3301', name: 'เงินปันผล', safe: 1 },
    { id: 36, companyId: 1, code: '4101', name: 'รายได้', safe: 1 },
    { id: 37, companyId: 1, code: '4201', name: 'ดอกเบี้ย', safe: 1 },
    { id: 38, companyId: 1, code: '5101', name: 'ต้นทุนการขาย', safe: 1 },
    { id: 39, companyId: 1, code: '5201', name: 'ซื้อสินค้า', safe: 1 },
    { id: 40, companyId: 1, code: '5301', name: 'ส่วนลด', safe: 1 },
    { id: 41, companyId: 1, code: '5401', name: 'เงินเดือน', safe: 1 },
    { id: 42, companyId: 1, code: '5501', name: 'ค่าโฆษณา', safe: 1 },
    { id: 43, companyId: 1, code: '5601', name: 'รายจ่ายสำนักงาน', safe: 1 },
    { id: 44, companyId: 1, code: '5701', name: 'ค่าธรรมเนียมธนาคาร', safe: 1 },
    { id: 45, companyId: 1, code: '5702', name: 'ดอกเบี้ยจ่าย', safe: 1 },
    { id: 46, companyId: 1, code: '5018', name: 'ค่าเสื่อมราคา', safe: 1 }
  ],
  companies: [
    {
      id: 1,
      code: 'ESPR-0001',
      name: 'บริษัท เริ่มต้น จำกัด',
      address: '',
      phone: '',
      taxCode: '',
      active: 1
    }
  ],
  customers: [
    {
      id: 1,
      companyId: 1,
      code: 'CT01-0001',
      name: 'ลูกค้าทั่วไป',
      address: '',
      phone: '',
      account: {
        bank: 'KBANK',
        code: '007',
        name: 'edkung'
      }
    }
  ]
}

knex
  .transaction(async trx => {
    await companies.insert(trx, data.companies)
    await customers.insert(trx, data.customers)
    await accountings.insert(trx, data.accountings)
  })
  .then(() => {
    console.log('!!! successed !!!')
  })
  .catch(err => {
    console.dir(err)
  })
