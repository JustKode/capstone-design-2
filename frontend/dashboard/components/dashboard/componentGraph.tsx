import { axisBottom, axisLeft, max, scaleBand, scaleLinear, select } from "d3"
import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { ComponentInfoProps } from "./componentInfo"

const MainContainer = styled.div`
  text-align: center;
`

const MainSvg = styled.svg`
  width: 500px;
  height: 500px;
`

export default function ({data}: {data: ComponentInfoProps[]}) {
  const svgRef = useRef(null)
  const width = 500
  const height = 500
  const margin = {top: 40, left: 40, bottom: 40, right: 40};

  useEffect(() => {
    const newData = data.slice(0, 5)
    const svg = select(svgRef.current)

    const x = scaleBand()
      .domain(newData.map(d => d.objectId))
      .range([margin.left, width - margin.right])
      .padding(0.2)
    
    const y = scaleLinear()
      .domain([0, max(newData, d => d.score)])
      .nice()
      .range([height - margin.bottom, margin.top])

    const xAxis = g => g
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x).tickSizeOuter(0))
      
    const yAxis = g => g
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(y))
      .call(g => g.select('.domain').remove())

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)
    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(newData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.objectId))
      .attr('y', d => y(d.score))
      .attr('height', d => y(0) - y(d.score))
      .attr('width', x.bandwidth());
    
    svg.node()
  }, [data])

  return (
    <MainContainer>
      <MainSvg ref={svgRef}>
        
      </MainSvg>
    </MainContainer>
  )
}