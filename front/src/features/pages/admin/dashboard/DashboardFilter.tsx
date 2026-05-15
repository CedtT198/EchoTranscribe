import { useState } from "react";

export interface Filter {
    startDate?: Date,
    endDate?: Date,
}

interface DashboardFilterProps {
  onFilter: (filter: Filter) => void;
}

export default function DashboardFilter({ onFilter }: DashboardFilterProps) {
    const [filter, setFilter] = useState<Filter>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };
    
    const filterStat = () => {
        onFilter(filter);
    }
    
    return(
        <div className="col-12">
            <form className="offset-lg-4 offset-md-4 col-md-8 col-lg-8 col-xs-12 row p-0 m-0">
                <div className="form-group col-md-4 col-lg-4 col-xs-12">
                    {/* <label htmlFor="startDate">Start date</label> */}
                    {/* <input type="date" id="startDate" className="form-control" onChange={(e) => updateFilter("startDate", e.target.value)}/> */}
                    <input type="date" name="startDate" className="form-control" onChange={handleChange}/>
                </div>
                <div className="form-group col-md-4 col-lg-4 col-xs-12">
                    {/* <label htmlFor="endDate">Start date</label> */}
                    <input type="date" name="endDate" className="form-control" onChange={handleChange}/>
                </div>
                <div className="form-group col-md-2 col-lg-2 col-xs-12">
                    <button className="btn btn-primary form-control" type="button" onClick={filterStat}>
                        <span className="fe fe-filter mr-1"></span>Filter
                    </button>
                </div>
            </form>
        </div>
    )
}