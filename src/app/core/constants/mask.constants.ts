import { MaskitoElementPredicate, MaskitoOptions } from "@maskito/core";
import { maskitoDateOptionsGenerator, maskitoNumberOptionsGenerator, maskitoParseDate, maskitoStringifyDate } from "@maskito/kit";

const dateMask = maskitoDateOptionsGenerator({ mode: 'dd/mm/yyyy', separator: '/' });

const phoneMask: MaskitoOptions = {
  mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
}

const parseDateMask = (date: string) => {
  return maskitoParseDate(date, { mode: 'dd/mm/yyyy' })
}

const formatDateMask = (date: Date) => {
  return maskitoStringifyDate(date, { mode: 'dd/mm/yyyy', separator: '/' });
}

const capacityMask = maskitoNumberOptionsGenerator({ min: 0, thousandSeparator: '.' })

const priceMask = maskitoNumberOptionsGenerator({
  decimalSeparator: ',',
  min: 10,
  max: 1000,
  precision: 2,
  thousandSeparator: '.'
})

const maskitoElement: MaskitoElementPredicate = async (el) =>
  (el as HTMLIonInputElement).getInputElement();

export {
  dateMask,
  capacityMask,
  priceMask,
  phoneMask,
  parseDateMask,
  formatDateMask,
  maskitoElement,
}