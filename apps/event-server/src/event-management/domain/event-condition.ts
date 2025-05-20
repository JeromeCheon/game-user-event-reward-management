import { ValueObject } from '@app/common/base/value-object';
import { EventConditionDto } from '@app/common/dto/create-event-dto';
import { EventComparisonOp } from '@app/common/variable/event-type';
import { EventConditionType } from '@app/common/variable/event-type';

export class EventCondition extends ValueObject<EventConditionDto> {
  constructor(props: EventConditionDto) {
    super(props);
  }
  get type(): EventConditionType {
    return this.props.type;
  }
  get value(): string {
    return this.props.value;
  }
  get comparisonOp(): EventComparisonOp {
    return this.props.comparisonOp;
  }
}
