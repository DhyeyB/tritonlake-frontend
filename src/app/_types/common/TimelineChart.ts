import { DataSetInitialOptions } from "vis-data/declarations/data-set"
import { TimelineOptions } from "vis-timeline"
export type IDProp = "id"

export interface TimelineChartPropType {
    groupDataset: DataSetInitialOptions<IDProp>
    options?: TimelineOptions
    itemDataset: DataSetInitialOptions<IDProp>
}
