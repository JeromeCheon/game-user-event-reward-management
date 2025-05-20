import { ValueObject } from '@app/common/base/value-object';
import { EventConditionType } from '@app/common/variable/event-type';

export interface ProgressStatusType {
  conditionType: EventConditionType;
  value: number;
}

export class ProgressStatus extends ValueObject<ProgressStatusType> {
  constructor(props: ProgressStatusType) {
    super(props);
  }

  get conditionType() {
    return this.props.conditionType;
  }

  get value() {
    return this.props.value;
  }

  set value(value: number) {
    this.props.value = value;
  }
}
