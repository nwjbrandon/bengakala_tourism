import { check, validationResult } from 'express-validator/check';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import db from '../storage/db';
import { TABLE_ADMINISTRATOR } from '../storage/tableName';

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
        if (_.isNaN(_.toNumber(item.pricesString)) || item.pricesString === '') {
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
      if (_.isEmpty(data.stories) || _.isEmpty(data.objective)) {
        throw Error('Cannot be empty');
      }
      _.map(data.stories, (item) => {
        if (item.title === '' || item.text === '') {
          throw Error('Field cannot be empty');
        }
        if (item.edit === 1) {
          throw Error('You need to update your changes.');
        }
      });
      _.map(data.objective, (item) => {
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


export const dashboardNewUserValidators = [
  check('username')
    .exists()
    .isString()
    .normalizeEmail()
    .isEmail()
    .withMessage('Valid email is required')
    .custom(async (email) => {
      const user = await db.fetchData(TABLE_ADMINISTRATOR, { email });
      if (user.length !== 0) {
        throw new Error('User exists');
      }
      return true;
    }),
  check('password')
    .exists()
    .isString()
    .isLength({ min: 5 })
    .withMessage('Password is too short')
    .custom(async (password, { req }) => {
      if (password !== req.body.confirmedPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  check('email')
    .exists()
    .isString()
    .normalizeEmail()
    .isEmail()
    .withMessage('Valid email is required')
    .custom(async (email) => {
      const user = await db.fetchData(TABLE_ADMINISTRATOR, { email });
      if (user.length !== 0) {
        throw new Error('User exists');
      }
      return true;
    }),
  check('jobTitle')
    .exists()
    .isString()
    .withMessage('Job Title is required'),
  check('phone')
    .exists()
    .isString()
    .withMessage('Phone number is required'),
];


export const dashboardChangePasswordValidators = [
  check('email')
    .exists()
    .isString()
    .normalizeEmail()
    .isEmail()
    .withMessage('Valid email is required')
    .custom(async (email) => {
      const info = await db.fetchData(TABLE_ADMINISTRATOR, { email });
      if (info.length === 0) {
        throw new Error('User does not exist');
      }
      return true;
    }),
  check('existingPassword')
    .exists()
    .isString()
    .withMessage('Valid password is required')
    .custom(async (existingPassword, { req }) => {
      const { email } = req.body;
      const info = _.head(await db.fetchData(TABLE_ADMINISTRATOR, { email }));
      if (bcrypt.compareSync(existingPassword, info.password)) {
        return true;
      }
      throw new Error('Invalid password');
    }),
  check('newPassword')
    .exists()
    .isString()
    .isLength({ min: 5 })
    .withMessage('Password is too short'),
];
