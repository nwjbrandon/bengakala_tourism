import { check, validationResult } from 'express-validator/check';
import _ from 'lodash';

export const errorHandling = [
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array()[0].msg;
      return res.status(422).json({
        error: {
          code: 422,
          message,
        }
      });
    }
    next();
    return 1;
  }
];

export const contactValidators = [
  check('email').exists().not().isEmpty()
    .normalizeEmail()
    .isEmail()
    .withMessage('Valid Email is Required'),
  check('name').exists().not().isEmpty()
    .withMessage('Name is Required'),
  check('contact').exists().not().isEmpty()
    .withMessage('Contact is Required'),
  check('subject').exists().not().isEmpty()
    .withMessage('Subject is Required'),
  check('message').exists().not().isEmpty()
    .withMessage('Message is Required'),
];

export const adminValidators = [
  check('email').exists().not().isEmpty()
    .normalizeEmail()
    .isEmail()
    .withMessage('Valid Username is Required'),
  check('password').exists().not().isEmpty()
    .withMessage('Password is Required'),
];

export const dashboardAccommodationValidators = [
  check('data')
    .custom((data) => {
      if (data === {}) {
        throw Error('Cannot be empty');
      }
      _.map(data, (item) => {
        if (_.isNaN(_.toNumber(item.pricesString))) {
          throw Error('Not a valid number');
        }
        if (item.edit === 1) {
          throw Error('You need to update your changes.');
        }
      });
      return true;
    })
];

export const dashboardAttractionValidators = [
  check('data')
    .custom((data) => {
      if (data === {}) {
        throw Error('Cannot be empty');
      }
      _.map(data, (item) => {
        if (item.title === '' || item.text === '' || item.imgUrl === '') {
          throw Error('Field cannot be empty');
        }
        if (item.edit === 1) {
          throw Error('You need to update your changes.');
        }
      });
      return true;
    })
];

export const dashboardFaqValidators = [
  check('data')
    .custom((data) => {
      if (data === {}) {
        throw Error('Cannot be empty');
      }
      _.map(data, (item) => {
        if (item.title === '' || item.text === '' || item.heading === '') {
          throw Error('Field cannot be empty');
        }
        if (item.edit === 1) {
          throw Error('You need to update your changes.');
        }
      });
      return true;
    })
];

export const dashboardHomeValidators = [
  check('data')
    .custom((data) => {
      if (data === {}) {
        throw Error('Cannot be empty');
      }
      _.map(data, (item) => {
        if (item.title === '' || item.text === '') {
          throw Error('Field cannot be empty');
        }
        if (item.edit === 1) {
          throw Error('You need to update your changes.');
        }
      });
      return true;
    })
];

export const dashboardContactValidators = [
  check('data')
    .custom((data) => {
      if (data === {}) {
        throw Error('Cannot be empty');
      }
      _.map(data, (item) => {
        if (item.title === '' || item.text === '') {
          throw Error('Field cannot be empty');
        }
        if (item.edit === 1) {
          throw Error('You need to update your changes.');
        }
      });
      return true;
    })
];
