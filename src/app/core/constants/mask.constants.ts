import { MaskitoElementPredicate, MaskitoOptions } from "@maskito/core";
import { maskitoDateOptionsGenerator, maskitoNumberOptionsGenerator } from "@maskito/kit";

const dateMask = maskitoDateOptionsGenerator({ mode: 'dd/mm/yyyy', separator: '/' });
const phoneMask: MaskitoOptions = {
  mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};
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
  priceMask,
  phoneMask,
  maskitoElement,
}