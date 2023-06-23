import { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { blendRGBColorArray } from './BlendColor'

export default function HighlightedText({
  content,
  highlights,
  highlightWrapper,
  interactions = true,
  onClick,
  onHoverChange,
}) {
  const [activeHighlightIds, setActiveHighlightIds] = useState([])

  const intervals = Array.from(
    new Set(
      Object.values(highlights).reduce(
        (result, highlight) => [...result, highlight.start, highlight.finish],
        [],
      ),
    ),
  )
  intervals.push(0)
  intervals.push(content.length - 1)
  intervals.sort((a, b) => a - b)
  const chunkGroups = [
    ..._.chunk(intervals, 2),
    ..._.chunk(intervals.splice(1), 2),
  ].filter((chunk) => chunk.length === 2)
    .map((chunk) => {
      const chunkData = highlights.reduce(
        (
          selectedHighlights,
          {
            color,
            finish: highlightFinish,
            start: highlightStart,
          },
        ) => {
          const [chunkStart, chunkFinish] = chunk
          if (chunkStart >= highlightStart && chunkFinish <= highlightFinish) {
            selectedHighlights.highlightedIds.add({
              finish: highlightFinish,
              start: highlightStart,
            })
            selectedHighlights.colors.add(color)
          }
          return selectedHighlights
        },
        {
          colors: new Set(),
          highlightedIds: new Set(),
        },
      )
      chunkData.highlightedIds = [...chunkData.highlightedIds]
      chunkData.colors = [...chunkData.colors]

      const blendedColor = blendRGBColorArray(chunkData.colors)
      return {
        chunk,
        content: content.slice(chunk[0], chunk[1]),
        ...chunkData,
        color: blendedColor,
      }
    })
    .sort((a, b) => a.chunk[0] - b.chunk[0])

  const onMouseEnter = ({ highlightedIds }) => {
    if (highlightedIds.length) setActiveHighlightIds(highlightedIds)
    if (onHoverChange) onHoverChange(highlightedIds)
  }

  const onMouseLeave = () => {
    if (onHoverChange) onHoverChange([])
  }

  return (
    <Wrapper>
      {chunkGroups.map(({
        chunk, color, content: groupContent, highlightedIds,
      }) => {
        const isActive = activeHighlightIds.some(
          (activeHighlightId) => highlightedIds.some((highlightId) => (
            activeHighlightId.start === highlightId.start
            && activeHighlightId.finish === highlightId.finish
          )),
        )

        return (
          <Chunk
            key={chunk.join('_')}
            active={isActive && interactions}
            color={color}
            onClick={() => isActive && onClick && onClick()}
            onMouseEnter={() => onMouseEnter({ highlightedIds })}
            onMouseLeave={onMouseLeave}
          >
            {highlightWrapper && isActive ? (
              <highlightWrapper.component {...highlightWrapper.props}>
                {groupContent}
              </highlightWrapper.component>
            ) : groupContent}
          </Chunk>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.p`
  text-align: justify;
`

const Chunk = styled.span`
  padding: 0;
  background-color: ${({ active, color }) => {
    const opacity = active ? '80' : '4D'
    return color === 'transparent' ? color : color + opacity
  }};
  box-shadow: ${({ active }) => (active
    ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
    : 'inherit')
};
  cursor: ${({ active }) => (active ? 'pointer' : 'inherit')};
  white-space: pre-line;
`