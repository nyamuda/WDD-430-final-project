import mongoose, { Schema, model } from 'mongoose';

interface ICompanyInfo {
  title: string;
  value: number;
}

let companySchema = new Schema<ICompanyInfo>(
  {
    title: String,
    value: Number,
  },
  {
    timestamps: true,
  }
);

let CompanyInfo = model<ICompanyInfo>(
  'CompanyInfo',
  companySchema,
  'company_information'
);

export { CompanyInfo };
