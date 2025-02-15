'use strict';
import { from, of } from 'rxjs';
import runAsync from 'run-async';

/**
 * Resolve a question property value if it is passed as a function.
 * This method will overwrite the property on the question object with the received value.
 * @param  {Object} question - Question object
 * @param  {String} prop     - Property to fetch name
 * @param  {Object} answers  - Answers object
 * @return {Rx.Observable}   - Observable emitting once value is known
 */

export const fetchAsyncQuestionProperty = function (question, prop, answers) {
  if (typeof question[prop] !== 'function') {
    return of(question);
  }

  return from(
    runAsync(question[prop])(answers).then((value) => {
      question[prop] = value;
      return question;
    })
  );
};
