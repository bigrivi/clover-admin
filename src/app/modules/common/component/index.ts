import {
    ChartCardComponent, MiniAreaComponent, MiniBarComponent, MiniProgressComponent,
    G2BarComponent, G2BarBasicComponent, G2PieComponent, TimelineComponent, GaugeComponent, TagCloudComponent,
    WaterWaveComponent, G2RadarComponent
} from './charts';
import { ExceptionComponent } from './exception';
import { StandardFormRowComponent } from './standard-form-row/standard-form-row.component';
import {EllipsisComponent} from "./ellipsis/ellipsis.component"
import {NumberInfoComponent} from "./number-info/number-info.component"

import { ListViewComponent } from './list-view/list-view.component';
import { TableViewComponent } from './table-view/table-view.component';
import { QuerySelectComponent } from './query-select/query-select.comonent';



export const shared_entry_components = [
];

export const shared_components = [
    ExceptionComponent,
    EllipsisComponent,
    StandardFormRowComponent,
    NumberInfoComponent,
    ListViewComponent,
    TableViewComponent,
    QuerySelectComponent,
    // charts
    ChartCardComponent,
    MiniAreaComponent,
    MiniBarComponent,
    MiniProgressComponent,
    G2BarComponent,
    G2BarBasicComponent,
    G2PieComponent,
    TimelineComponent,
    GaugeComponent,
    TagCloudComponent,
    WaterWaveComponent,
    G2RadarComponent
];
